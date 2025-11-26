import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import SectionHeader from "../components/others/SectionHeader";
import Badge from "../components/others/Badge";
import PrimaryButton from "../components/buttons/PrimaryButton";

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
  const [activeTab, setActiveTab] = useState("profile");

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

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");

      if (user.address) {
        const parts = user.address.split(", ");
        if (parts.length >= 3) {
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

  // Calculate profile completion
  const profileCompletion = () => {
    let completed = 0;
    let total = 4;
    if (user?.name) completed++;
    if (user?.email) completed++;
    if (user?.phoneNumber) completed++;
    if (user?.address) completed++;
    return Math.round((completed / total) * 100);
  };

  return (
    <section id="user-dashboard" className="page-section">
      {/* Welcome Banner */}
      <div className="panel" style={{
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
        color: '#fff',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '2rem' }}>
            Welcome back, {user?.name || 'User'}! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
            Manage your profile, orders, and wishlist all in one place
          </p>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>

      {/* Profile Completion Progress */}
      <div className="panel" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h4>Profile Completion</h4>
            <p className="muted" style={{ fontSize: '0.9rem' }}>Complete your profile to unlock all features</p>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            {profileCompletion()}%
          </div>
        </div>
        <div style={{
          width: '100%',
          height: '12px',
          background: 'var(--color-border)',
          borderRadius: '100px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${profileCompletion()}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))',
            transition: 'width 0.3s ease',
            borderRadius: '100px'
          }}></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '2px solid var(--color-border)',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'profile', label: '👤 Profile', icon: '👤' },
          { id: 'orders', label: '📦 Orders', icon: '📦' },
          { id: 'wishlist', label: '❤️ Wishlist', icon: '❤️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '1rem',
              marginBottom: '-2px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="two-column">
          {/* Profile Update Form */}
          <div className="panel">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✏️ Update Profile
            </h3>
            {message && <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', color: '#15803d', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
            {error && <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <label>
                Name
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                State
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("");
                  }}
                  disabled={!!user?.address}
                >
                  <option value="">Select State</option>
                  {Object.keys(indianStatesAndDistricts).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <label>
                District
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState || !!user?.address}
                >
                  <option value="">Select District</option>
                  {selectedState &&
                    indianStatesAndDistricts[selectedState]?.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                </select>
              </label>

              <label>
                Full Address
                <input
                  type="text"
                  placeholder="House No, Street, Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!!user?.address}
                />
              </label>

              <label>
                Phone Number
                <input
                  type="text"
                  placeholder="Enter phone number (+91...)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>

              <PrimaryButton type="submit">Update Profile</PrimaryButton>
            </form>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Account Stats */}
            <div className="panel">
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📊 Account Stats
              </h3>
              <div className="stats-grid">
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(139, 94, 60, 0.05)', borderRadius: '8px' }}>
                  <p className="muted" style={{ fontSize: '0.9rem' }}>Total Orders</p>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>{orders?.length || 0}</strong>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(139, 94, 60, 0.05)', borderRadius: '8px' }}>
                  <p className="muted" style={{ fontSize: '0.9rem' }}>Wishlist Items</p>
                  <strong style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>{wishlist?.length || 0}</strong>
                </div>
              </div>
            </div>

            {/* Saved Information */}
            {(user?.phoneNumber || user?.address) && (
              <div className="panel">
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  💾 Saved Information
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {user?.phoneNumber && (
                    <div className="list-item">
                      <span className="muted">📱 Phone Number</span>
                      <strong style={{ textAlign: 'right' }}>{user.phoneNumber}</strong>
                    </div>
                  )}
                  {user?.address && (
                    <div className="list-item">
                      <span className="muted">📍 Address</span>
                      <strong style={{ textAlign: 'right' }}>{user.address}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="panel">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📦 Order History
          </h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</p>
              <h4>No orders yet</h4>
              <p className="muted">Start shopping to see your orders here</p>
              <Link to="/shop" style={{ marginTop: '1rem', display: 'inline-block' }}>
                <PrimaryButton>Browse Products</PrimaryButton>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {orders?.map((order) => (
                <div key={order._id} className="panel" style={{ background: 'var(--color-surface-glass)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <strong style={{ fontSize: '1.1rem' }}>Order #{order._id.substring(0, 8)}</strong>
                      <p className="muted" style={{ marginTop: '0.25rem' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="price-tag" style={{ fontSize: '1.5rem' }}>${order.totalPrice.toFixed(2)}</p>
                      <Badge tone={order.isPaid ? "success" : "warning"}>
                        {order.isPaid ? "✓ Paid" : "⏳ Unpaid"}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    <Badge tone={order.isDelivered ? "success" : "info"}>
                      {order.isDelivered ? "✓ Delivered" : "🚚 In Transit"}
                    </Badge>
                    <span className="muted">{order.orderItems?.length || 0} items</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="panel">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ❤️ My Wishlist
          </h3>
          {loading ? (
            <p>Loading wishlist...</p>
          ) : wishlist?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</p>
              <h4>Your wishlist is empty</h4>
              <p className="muted">Save items you love for later</p>
              <Link to="/shop" style={{ marginTop: '1rem', display: 'inline-block' }}>
                <PrimaryButton>Browse Products</PrimaryButton>
              </Link>
            </div>
          ) : (
            <div className="product-grid">
              {wishlist?.map((item) => (
                <div key={item._id} className="panel" style={{ background: 'var(--color-surface-glass)', padding: '1rem' }}>
                  {item.images && item.images[0] && (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                    />
                  )}
                  <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
                  <p className="price-tag" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>${item.price}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/product/${item._id}`} style={{ flex: 1 }}>
                      <PrimaryButton style={{ width: '100%' }}>View</PrimaryButton>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      style={{
                        padding: '0.75rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UserDashboard;
