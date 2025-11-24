import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            phoneVerified: user.phoneVerified,
            address: user.address,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Google Auth
// @route   POST /api/users/google
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (user) {
        // User exists, log them in
        // Optional: Update googleId if not present
        if (!user.googleId) {
            user.googleId = sub;
            await user.save();
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            phoneVerified: user.phoneVerified,
            address: user.address,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
            avatar: user.avatar || picture,
        });
    } else {
        // Create new user
        user = await User.create({
            name,
            email,
            googleId: sub,
            password: Date.now().toString(), // Dummy password for google users
            avatar: picture,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            phoneVerified: user.phoneVerified,
            token: generateToken(user._id),
            avatar: user.avatar,
        });
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
            phoneNumber: user.phoneNumber,
            phoneVerified: user.phoneVerified,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.phoneVerified !== undefined) {
            user.phoneVerified = req.body.phoneVerified;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            address: updatedUser.address,
            phoneNumber: updatedUser.phoneNumber,
            phoneVerified: updatedUser.phoneVerified,
            wishlist: updatedUser.wishlist,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (user) {
        res.json(user.wishlist);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Add to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        if (user.wishlist.includes(productId)) {
            res.status(400);
            throw new Error("Product already in wishlist");
        }
        user.wishlist.push(productId);
        await user.save();
        res.json(user.wishlist);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    if (user) {
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();
        res.json(user.wishlist);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export { authUser, registerUser, googleAuth, getUserProfile, updateUserProfile, getUsers, getWishlist, addToWishlist, removeFromWishlist };
