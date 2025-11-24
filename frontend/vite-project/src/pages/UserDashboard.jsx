import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import SectionHeader from "../components/others/SectionHeader";
import Badge from "../components/others/Badge";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const indianStatesAndDistricts = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal (Rural)", "Warangal (Urban)", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

const UserDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Address State
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // OTP State
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  };

  const handleSendOtp = () => {
    if (!phoneNumber) {
      setError("Please enter a phone number");
      return;
    }

    let formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    if (formattedNumber.length === 10) {
      formattedNumber = `+91${formattedNumber}`; // Default to India if 10 digits
    } else if (!phoneNumber.startsWith("+")) {
      formattedNumber = `+${formattedNumber}`;
    } else {
      formattedNumber = phoneNumber;
    }

    setError(null);
    setMessage(null);
    setPhoneNumber(formattedNumber); // Update state with formatted number
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, formattedNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        setMessage(`OTP Sent to ${formattedNumber}`);
      }).catch((error) => {
        console.error(error);
        setError(error.message || "Failed to send OTP. Please check the number and try again.");
      });
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then(async (result) => {
        setIsVerified(true);
        setOtpSent(false);

        // Auto-save verified phone number AND address
        try {
          const fullAddress = (address || selectedDistrict || selectedState)
            ? `${address}, ${selectedDistrict}, ${selectedState}`
            : undefined;

          const payload = { id: user._id, phoneNumber, phoneVerified: true };
          if (fullAddress) {
            payload.address = fullAddress;
          }

          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await api.put(
            "/users/profile",
            payload,
            config
          );
          updateUser(data);
          setMessage("Phone Number Verified and Profile Saved!");
        } catch (saveError) {
          console.error("Error saving profile:", saveError);
          setMessage("Phone Verified, but failed to save to profile. Please click Update.");
        }

        setError(null);
      }).catch((error) => {
        setError("Invalid OTP");
      });
    } else {
      setError("Please enter a 6-digit OTP");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      if (user.phoneVerified) {
        setIsVerified(true);
      }

      if (user.address) {
        const parts = user.address.split(", ");
        if (parts.length >= 3) {
          // Assuming format: "Address, District, State"
          const state = parts[parts.length - 1];
          const district = parts[parts.length - 2];
          const addr = parts.slice(0, parts.length - 2).join(", ");

          if (indianStatesAndDistricts[state]) {
            setSelectedState(state);
            setSelectedDistrict(district);
            setAddress(addr);
          } else {
            setAddress(user.address);
          }
        } else {
          setAddress(user.address);
        }
      }
    }
  }, [user]);

  // ... (fetchData useEffect remains same)



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const fullAddress = (address || selectedDistrict || selectedState)
        ? `${address}, ${selectedDistrict}, ${selectedState}`
        : undefined;

      const payload = { id: user._id, name, email, phoneNumber };
      if (fullAddress) {
        payload.address = fullAddress;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.put(
        "/users/profile",
        payload,
        config
      );
      updateUser(data);
      setMessage("Profile Updated Successfully");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setMessage(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const [ordersRes, wishlistRes] = await Promise.all([
          api.get("/orders/myorders", config),
          api.get("/users/wishlist", config),
        ]);
        setOrders(ordersRes.data);
        setWishlist(wishlistRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const removeFromWishlist = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await api.delete(`/users/wishlist/${id}`, config);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };



  return (
    <section id="user-dashboard" className="page-section">
      <SectionHeader
        title={`User Profile`}
        subtitle="Manage your account"
        action={<Badge tone="success">Member</Badge>}
      />

      <div className="two-column">
        {/* Profile Update Form */}
        <div className="panel">
          <h3>Update Profile</h3>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
              />
            </div>
            <div>
              <label>State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict(""); // Reset district when state changes
                }}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                disabled={!!user?.address}
              >
                <option value="">Select State</option>
                {Object.keys(indianStatesAndDistricts).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                disabled={!selectedState || !!user?.address}
              >
                <option value="">Select District</option>
                {selectedState &&
                  indianStatesAndDistricts[selectedState]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label>Full Address</label>
              <input
                type="text"
                placeholder="House No, Street, Area"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                disabled={!!user?.address}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Enter phone number (+91...)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ flex: 1, padding: "0.5rem", marginTop: "0.25rem" }}
                  disabled={isVerified || otpSent || !!user?.phoneVerified}
                />
                {!isVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="btn btn-secondary"
                    style={{ marginTop: "0.25rem" }}
                  >
                    {otpSent ? "Resend OTP" : "Verify"}
                  </button>
                )}
              </div>
              <div id="recaptcha-container"></div>
            </div>

            {otpSent && !isVerified && (
              <div>
                <label>Enter OTP</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ flex: 1, padding: "0.5rem", marginTop: "0.25rem" }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="btn btn-success"
                    style={{ marginTop: "0.25rem" }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {isVerified && <p style={{ color: "green", marginTop: "0.5rem" }}>✓ Phone Number Verified</p>}
            <PrimaryButton type="submit">Update</PrimaryButton>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Saved Information Panel */}
          {(user?.phoneVerified || user?.address) && (
            <div className="panel">
              <h3>Saved Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                {user?.phoneVerified && user?.phoneNumber && (
                  <div className="list-item">
                    <span className="muted">Phone Number</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <strong>{user.phoneNumber}</strong>
                      <Badge tone="success">✓ Verified</Badge>
                    </div>
                  </div>
                )}
                {user?.address && (
                  <div className="list-item">
                    <span className="muted">Address</span>
                    <strong>{user.address}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="panel stats-grid">
            <div>
              <p className="muted">Total Orders</p>
              <strong>{orders?.length || 0}</strong>
            </div>
            <div>
              <p className="muted">Account Status</p>
              <strong>Active</strong>
            </div>
          </div>

          <div className="panel">
            <h3>Order History</h3>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders?.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="list" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {orders?.map((order) => (
                  <li key={order._id} className="list-item">
                    <div>
                      <strong>Order #{order._id.substring(0, 8)}</strong>
                      <p className="muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p><strong>${order.totalPrice.toFixed(2)}</strong></p>
                      <Badge tone={order.isPaid ? "success" : "warning"}>
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel">
            <h3>My Wishlist</h3>
            {loading ? (
              <p>Loading wishlist...</p>
            ) : wishlist?.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              <ul className="list" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {wishlist?.map((item) => (
                  <li key={item._id} className="list-item">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      {item.images && item.images[0] && (
                        <img
                          src={item.images[0].url}
                          alt={item.name}
                          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                        />
                      )}
                      <div>
                        <strong>{item.name}</strong>
                        <p>${item.price}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link to={`/product/${item._id}`} className="btn btn-sm btn-secondary">
                        View
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
