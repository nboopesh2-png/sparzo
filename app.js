import { useState, useEffect } from "react";

/* ─── MOCK DATA ─────────────────────────────────────────────── */
const USERS = [
  { id: 1, name: "Admin User", email: "", password: "", role: "admin" },
  { id: 2, name: "", email: "", password: "", role: "customer" },
];
const INIT_PRODUCTS = [
  { id: 1, name: "Rose Gold Serum", category: "Skincare", price: 1299, rating: 4.8, emoji: "🌹", tag: "Bestseller", desc: "24K rose-infused brightening serum", stock: 42 },
  { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 599, rating: 4.7, emoji: "💄", tag: "New", desc: "12-hour non-transfer formula", stock: 88 },
  { id: 3, name: "Argan Hair Mask", category: "Haircare", price: 899, rating: 4.9, emoji: "✨", tag: "Bestseller", desc: "Deep repair Moroccan oil treatment", stock: 35 },
  { id: 4, name: "Glow Blush Palette", category: "Makeup", price: 1499, rating: 4.6, emoji: "🌸", tag: "New", desc: "6 buildable shades for luminous skin", stock: 20 },
  { id: 5, name: "Hydra Cream SPF50", category: "Skincare", price: 799, rating: 4.8, emoji: "🧴", tag: "Sale", desc: "All-day moisture with sun protection", stock: 60 },
  { id: 6, name: "Keratin Shampoo", category: "Haircare", price: 649, rating: 4.5, emoji: "🫧", tag: "", desc: "Frizz-free silky smooth formula", stock: 55 },
  { id: 7, name: "Oud Perfume", category: "Fragrance", price: 2499, rating: 4.9, emoji: "🕌", tag: "Luxury", desc: "Long-lasting oriental wood & rose", stock: 18 },
  { id: 8, name: "Eye Liner Pen", category: "Makeup", price: 449, rating: 4.6, emoji: "👁️", tag: "", desc: "Precision tip, smudge-proof finish", stock: 72 },
  { id: 9, name: "Vitamin C Toner", category: "Skincare", price: 699, rating: 4.7, emoji: "🍋", tag: "Sale", desc: "Brightens & evens skin tone", stock: 44 },
  { id: 10, name: "Silk Hair Serum", category: "Haircare", price: 549, rating: 4.4, emoji: "💎", tag: "", desc: "Instant shine, heat protection", stock: 38 },
  { id: 11, name: "Floral Eau de Toilette", category: "Fragrance", price: 1799, rating: 4.7, emoji: "🌺", tag: "New", desc: "Fresh jasmine & peach blossom", stock: 25 },
  { id: 12, name: "BB Cream Foundation", category: "Makeup", price: 849, rating: 4.5, emoji: "🌟", tag: "", desc: "Lightweight, buildable coverage", stock: 50 },
];

const INIT_ORDERS = [
  { id: "#LB-1021", customer: "Priya Sharma", items: "Rose Gold Serum × 1", total: 1299, status: "Delivered", date: "Jun 1" },
  { id: "#LB-1022", customer: "Ananya Roy", items: "Velvet Matte Lipstick × 2", total: 1198, status: "Processing", date: "Jun 2" },
  { id: "#LB-1023", customer: "Meera Kapoor", items: "Argan Hair Mask × 1, Oud Perfume × 1", total: 3398, status: "Shipped", date: "Jun 3" },
  { id: "#LB-1024", customer: "Riya Patel", items: "Glow Blush Palette × 1", total: 1499, status: "Processing", date: "Jun 4" },
  { id: "#LB-1025", customer: "Sneha Nair", items: "Hydra Cream SPF50 × 2", total: 1598, status: "Pending", date: "Jun 5" },
];

const INIT_BOOKINGS = [
  { id: "#B-201", customer: "Divya Menon", service: "Bridal Makeup", date: "Jun 6", time: "10:00 AM", status: "Confirmed" },
  { id: "#B-202", customer: "Kavya Rao", service: "Hair Spa", date: "Jun 7", time: "2:00 PM", status: "Pending" },
  { id: "#B-203", customer: "Lakshmi P.", service: "Facial Treatment", date: "Jun 8", time: "11:30 AM", status: "Confirmed" },
  { id: "#B-204", customer: "Sana Khan", service: "Nail Art", date: "Jun 9", time: "4:00 PM", status: "Pending" },
];

const SERVICES = [
  { name: "Bridal Makeup", price: 8999, duration: "3 hrs", emoji: "👰" },
  { name: "Hair Spa", price: 1499, duration: "1.5 hrs", emoji: "💆" },
  { name: "Facial Treatment", price: 1999, duration: "1 hr", emoji: "🧖" },
  { name: "Nail Art", price: 799, duration: "45 min", emoji: "💅" },
];

const CATEGORIES = ["All", "Skincare", "Makeup", "Haircare", "Fragrance"];
const TAG_COLOR = { Bestseller: "#d4896a", New: "#7eb8a8", Sale: "#c97070", Luxury: "#9b7fc8" };
const STATUS_COLOR = { Delivered: "#7eb8a8", Processing: "#c9956c", Shipped: "#9b7fc8", Pending: "#a08070", Confirmed: "#7eb8a8" };

/* ─── STYLES ─────────────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#1a1010;}::-webkit-scrollbar-thumb{background:#c9956c;border-radius:4px;}
  body{background:#0f0a0a;}
  .btn{background:linear-gradient(135deg,#c9956c,#e8c4a8);color:#1a0e0e;border:none;padding:10px 24px;border-radius:30px;cursor:pointer;font-family:'Jost',sans-serif;font-weight:600;font-size:13px;letter-spacing:.8px;transition:all .25s;}
  .btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,149,108,.45);}
  .btn-ghost{background:transparent;border:1px solid #c9956c55;color:#c9956c;padding:9px 20px;border-radius:30px;cursor:pointer;font-family:'Jost';font-size:12px;letter-spacing:.8px;transition:all .25s;}
  .btn-ghost:hover{border-color:#c9956c;background:#c9956c15;}
  .btn-sm{padding:7px 16px;font-size:11px;}
  .btn-danger{background:linear-gradient(135deg,#c97070,#e8a8a8);color:#1a0a0a;}
  .card{background:linear-gradient(160deg,#1e1313,#180e0e);border:1px solid #2a1a1a;border-radius:18px;}
  .card-hover{transition:transform .3s,box-shadow .3s;}.card-hover:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.5);}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:99;backdrop-filter:blur(6px);}
  .slide-in{animation:slideIn .35s ease;}
  @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
  .fade-up{animation:fadeUp .45s ease both;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeIn .4s ease both;}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  input,select,textarea{background:#1e1313;border:1px solid #3a2a2a;color:#f5ede6;padding:10px 16px;border-radius:10px;font-family:'Jost',sans-serif;font-size:13px;width:100%;outline:none;transition:border .2s;}
  input:focus,select:focus{border-color:#c9956c;}
  input::placeholder{color:#5a4040;}
  label{font-family:'Jost';font-size:11px;color:#a08070;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px;}
  table{width:100%;border-collapse:collapse;}
  th{font-family:'Jost';font-size:10px;color:#7a6060;letter-spacing:1.5px;text-transform:uppercase;padding:12px 16px;text-align:left;border-bottom:1px solid #2a1a1a;}
  td{font-family:'Jost';font-size:13px;color:#d4c4b8;padding:14px 16px;border-bottom:1px solid #1e1313;}
  tr:last-child td{border-bottom:none;}
  tr:hover td{background:#1e1313;}
`;

/* ─── MAIN APP ───────────────────────────────────────────────── */
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("auth"); // auth | shop | admin
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [bookings, setBookings] = useState(INIT_BOOKINGS);
  const [toast, setToast] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2400);
  };

  const login = (email, password) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setPage(user.role === "admin" ? "admin" : "shop");
      showToast(`Welcome back, ${user.name.split(" ")[0]}! 🌸`);
    } else {
      showToast("Invalid credentials. Try again.", "error");
    }
  };

  const logout = () => { setCurrentUser(null); setPage("auth"); setCart([]); setWishlist([]); };
  const addToCart = (p) => { setCart(prev => { const f = prev.find(i=>i.id===p.id); return f ? prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}]; }); showToast(`${p.name} added ✓`); };
  const updateQty = (id, d) => setCart(prev => prev.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));
  const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  return (
    <div style={{ fontFamily: "'Jost',sans-serif", background: "#0f0a0a", minHeight: "100vh", color: "#f5ede6" }}>
      <style>{G}</style>
      {/* BG Orbs */}
      <div style={{ position:"fixed",top:-80,right:-80,width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,#c9956c0d,transparent 70%)",pointerEvents:"none",zIndex:0 }}/>
      <div style={{ position:"fixed",bottom:-100,left:-60,width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,#7eb8a812,transparent 70%)",pointerEvents:"none",zIndex:0 }}/>

      {/* Toast */}
      {toast && (
        <div className="fade-in" style={{ position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",background:toast.type==="error"?"#2a1313":"#1e1a13",border:`1px solid ${toast.type==="error"?"#c9706855":"#c9956c55"}`,color:toast.type==="error"?"#e8a8a8":"#e8c4a8",padding:"12px 28px",borderRadius:30,zIndex:9999,fontFamily:"'Jost'",fontSize:13,letterSpacing:.5,boxShadow:"0 10px 30px rgba(0,0,0,.5)",whiteSpace:"nowrap" }}>
          {toast.msg}
        </div>
      )}

      {page === "auth" && <AuthPage onLogin={login} showToast={showToast} />}
      {page === "shop" && <ShopPage user={currentUser} onLogout={logout} products={products} cart={cart} cartCount={cartCount} cartTotal={cartTotal} addToCart={addToCart} updateQty={updateQty} wishlist={wishlist} setWishlist={setWishlist} showToast={showToast} bookings={bookings} setBookings={setBookings} orders={orders} setOrders={setOrders} setCart={setCart} />}
      {page === "admin" && <AdminPage user={currentUser} onLogout={logout} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} bookings={bookings} setBookings={setBookings} showToast={showToast} />}
    </div>
  );
}

/* ─── AUTH PAGE ──────────────────────────────────────────────── */
function AuthPage({ onLogin, showToast }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [show, setShow] = useState(false);

  const handle = () => {
    if (!form.email || !form.password) { showToast("Please fill all fields", "error"); return; }
    if (mode === "login") { onLogin(form.email, form.password); }
    else { showToast("Account created! Please log in 🎀"); setMode("login"); setForm({name:"",email:"",password:""}); }
  };

  return (
    <div className="fade-in" style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",zIndex:1 }}>
      {/* Left decorative panel (hidden on small) */}
      <div style={{ position:"fixed",left:0,top:0,bottom:0,width:"42%",background:"linear-gradient(160deg,#1a0e0e,#0f0a0a)",borderRight:"1px solid #2a1a1a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:28 }}>
        <div style={{ textAlign:"center",padding:"0 40px" }}>
          <div style={{ fontSize:56,marginBottom:16 }}>🌸</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:42,fontWeight:300,lineHeight:1.1,background:"linear-gradient(135deg,#c9956c,#e8c4a8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Lumière<br/>Beauty</div>
          <p style={{ fontFamily:"'Jost'",color:"#5a4040",fontSize:12,letterSpacing:2,marginTop:14,textTransform:"uppercase" }}>Premium · Luxury · Glow</p>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:16,width:"80%",maxWidth:260 }}>
          {[["✨","12+ Premium Brands"],["🚚","Free Delivery ₹999+"],["💆","Salon Services"],["🔒","Secure Checkout"]].map(([icon,text])=>(
            <div key={text} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 20px",background:"#1e1313",borderRadius:12,border:"1px solid #2a1a1a" }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <span style={{ fontFamily:"'Jost'",fontSize:12,color:"#a08070" }}>{text}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:"'Jost'",color:"#3a2a2a",fontSize:11,letterSpacing:1 }}>© 2026 Lumière Beauty</p>
      </div>

      {/* Auth Card */}
      <div className="card fade-up" style={{ marginLeft:"42%",width:"100%",maxWidth:420,padding:"44px 40px",position:"relative",zIndex:2 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:32,marginBottom:6 }}>
          {mode==="login" ? "Welcome back" : "Create account"}
          <span style={{ color:"#c9956c" }}> ✦</span>
        </div>
        <p style={{ fontFamily:"'Jost'",color:"#7a6060",fontSize:12,marginBottom:32,letterSpacing:.5 }}>
          {mode==="login" ? "Sign in to your Lumière account" : "Join the Lumière family today"}
        </p>

        <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
          {mode==="signup" && (
            <div><label>Full Name</label><input placeholder="Priya Sharma" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
          )}
          <div><label>Email Address</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
          <div>
            <label>Password</label>
            <div style={{ position:"relative" }}>
              <input type={show?"text":"password"} placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==="Enter"&&handle()} style={{ paddingRight:44 }} />
              <button onClick={()=>setShow(!show)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#7a6060",cursor:"pointer",fontSize:16 }}>{show?"🙈":"👁"}</button>
            </div>
          </div>
        </div>

        <button className="btn" style={{ width:"100%",marginTop:28,padding:"13px",fontSize:14 }} onClick={handle}>
          {mode==="login" ? "Sign In →" : "Create Account →"}
        </button>

        {mode==="login" && (
          <div style={{ marginTop:16,background:"#1a1010",borderRadius:12,padding:"14px 18px",border:"1px solid #2a1a1a" }}>
            <p style={{ fontFamily:"'Jost'",fontSize:11,color:"#5a4040",marginBottom:6,letterSpacing:1 }}>DEMO CREDENTIALS</p>
            <p style={{ fontFamily:"'Jost'",fontSize:12,color:"#7a6060" }}>👤 Customer: user@lumiere.com / user123</p>
            <p style={{ fontFamily:"'Jost'",fontSize:12,color:"#c9956c" }}>⚙️ Admin: admin@lumiere.com / admin123</p>
          </div>
        )}

        <p style={{ fontFamily:"'Jost'",fontSize:12,color:"#5a4040",textAlign:"center",marginTop:22 }}>
          {mode==="login" ? "New here? " : "Already have an account? "}
          <button onClick={()=>setMode(mode==="login"?"signup":"login")} style={{ background:"none",border:"none",color:"#c9956c",cursor:"pointer",fontFamily:"'Jost'",fontSize:12 }}>
            {mode==="login"?"Create account →":"Sign in →"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── SHOP PAGE ──────────────────────────────────────────────── */
function ShopPage({ user,onLogout,products,cart,cartCount,cartTotal,addToCart,updateQty,wishlist,setWishlist,showToast,bookings,setBookings,orders,setOrders,setCart }) {
  const [tab, setTab] = useState("shop");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [form, setForm] = useState({ name:"",email:"",phone:"",address:"",city:"",pin:"",payment:"" });

  const filtered = products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase()));
  const toggleWish = id => setWishlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);

  const placeOrder = () => {
    const newOrder = { id:`#LB-${1030+orders.length}`, customer:user.name, items:cart.map(i=>`${i.name} × ${i.qty}`).join(", "), total:cartTotal, status:"Pending", date:"Jun "+new Date().getDate() };
    setOrders(prev=>[newOrder,...prev]);
    setCart([]); setCheckoutOpen(false); setOrderDone(true);
    setTimeout(()=>setOrderDone(false),3200);
  };

  const bookService = (s) => {
    const nb = { id:`#B-${210+bookings.length}`, customer:user.name, service:s.name, date:"Jun "+(new Date().getDate()+1), time:"10:00 AM", status:"Pending" };
    setBookings(prev=>[nb,...prev]);
    setBookingDone(true); setTimeout(()=>setBookingDone(false),3200);
    showToast(`${s.name} booked! 💆`);
  };

  return (
    <div style={{ minHeight:"100vh",paddingBottom:80,position:"relative",zIndex:1 }}>
      {/* Success overlays */}
      {orderDone && <SuccessOverlay icon="🎀" title="Order Placed!" sub="Your beauty essentials are on their way ✨" />}
      {bookingDone && <SuccessOverlay icon="💆" title="Booking Confirmed!" sub="We'll see you soon ✨" />}

      {/* Navbar */}
      <nav style={{ position:"sticky",top:0,zIndex:50,background:"#0f0a0aee",backdropFilter:"blur(16px)",borderBottom:"1px solid #2a1a1a",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:62 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <span style={{ fontSize:20 }}>🌸</span>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600,background:"linear-gradient(135deg,#c9956c,#e8c4a8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Lumière</span>
        </div>
        <div style={{ display:"flex",gap:2 }}>
          {[["🛍","shop"],["💆","services"],["♡","wishlist"],["ℹ","about"]].map(([ic,t])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ background:"none",border:"none",color:tab===t?"#c9956c":"#5a4040",padding:"8px 14px",cursor:"pointer",fontFamily:"'Jost'",fontSize:12,letterSpacing:1,textTransform:"uppercase",borderBottom:tab===t?"2px solid #c9956c":"2px solid transparent",transition:"all .2s" }}>{ic} {t}</button>
          ))}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontFamily:"'Jost'",fontSize:12,color:"#7a6060" }}>Hi, {user.name.split(" ")[0]} 👋</span>
          <button className="btn btn-sm" onClick={()=>setCartOpen(true)} style={{ display:"flex",alignItems:"center",gap:6 }}>
            🛍 {cartCount>0 && <span style={{ background:"#1a0e0e",borderRadius:"50%",width:17,height:17,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700 }}>{cartCount}</span>}
          </button>
          <button className="btn-ghost btn-sm" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div className="overlay" onClick={()=>setCartOpen(false)} />
          <div className="slide-in" style={{ position:"fixed",top:0,right:0,bottom:0,width:370,background:"#140d0d",borderLeft:"1px solid #2a1a1a",zIndex:100,display:"flex",flexDirection:"column" }}>
            <div style={{ padding:"22px 22px 14px",borderBottom:"1px solid #2a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22 }}>Shopping Cart</span>
              <button onClick={()=>setCartOpen(false)} style={{ background:"none",border:"none",color:"#c9956c",cursor:"pointer",fontSize:18 }}>✕</button>
            </div>
            <div style={{ flex:1,padding:18,overflowY:"auto" }}>
              {cart.length===0 ? (
                <div style={{ textAlign:"center",marginTop:70,color:"#4a3030" }}><div style={{ fontSize:44,marginBottom:14 }}>🛍️</div><div style={{ fontSize:13 }}>Your cart is empty</div></div>
              ) : cart.map(item=>(
                <div key={item.id} style={{ display:"flex",gap:14,marginBottom:16,padding:16,background:"#1e1313",borderRadius:14,border:"1px solid #2a1a1a" }}>
                  <div style={{ fontSize:34,background:"#2a1a1a",borderRadius:10,width:54,height:54,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{item.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15 }}>{item.name}</div>
                    <div style={{ fontSize:11,color:"#a08070",marginBottom:8 }}>₹{item.price.toLocaleString()}</div>
                    <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <button onClick={()=>updateQty(item.id,-1)} style={{ width:26,height:26,borderRadius:"50%",border:"1px solid #3a2a2a",background:"none",color:"#c9956c",cursor:"pointer" }}>−</button>
                      <span style={{ fontSize:13,minWidth:18,textAlign:"center" }}>{item.qty}</span>
                      <button onClick={()=>updateQty(item.id,1)} style={{ width:26,height:26,borderRadius:"50%",border:"1px solid #3a2a2a",background:"none",color:"#c9956c",cursor:"pointer" }}>+</button>
                    </div>
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"#e8c4a8",alignSelf:"center" }}>₹{(item.price*item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>
            {cart.length>0 && (
              <div style={{ padding:18,borderTop:"1px solid #2a1a1a" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}>
                  <span style={{ fontSize:12,color:"#a08070" }}>Total</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#e8c4a8" }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                <button className="btn" style={{ width:"100%",padding:13 }} onClick={()=>{setCartOpen(false);setCheckoutOpen(true);}}>Checkout →</button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <>
          <div className="overlay" onClick={()=>setCheckoutOpen(false)} />
          <div className="card fade-up" style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",padding:36,width:"min(460px,92vw)",zIndex:200,overflowY:"auto",maxHeight:"90vh" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,marginBottom:22 }}>Checkout 💳</div>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div><label>Full Name</label><input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <div><label>Email</label><input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                <div><label>Phone</label><input type="tel" placeholder="+91 XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
              </div>
              <div><label>Address</label><input placeholder="Street, Area" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <div><label>City</label><input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></div>
                <div><label>PIN Code</label><input placeholder="600001" value={form.pin} onChange={e=>setForm({...form,pin:e.target.value})} /></div>
              </div>
              <div><label>Payment</label>
                <select value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})}>
                  <option value="">Select method</option>
                  <option>UPI / GPay / PhonePe</option>
                  <option>Credit / Debit Card</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:"#e8c4a8" }}>₹{cartTotal.toLocaleString()}</span>
              <div style={{ display:"flex",gap:10 }}>
                <button className="btn-ghost" onClick={()=>setCheckoutOpen(false)}>Cancel</button>
                <button className="btn" onClick={placeOrder}>Place Order 🎀</button>
              </div>
            </div>
          </div>
        </>
      )}

      <main style={{ maxWidth:1100,margin:"0 auto",padding:"0 20px 30px",position:"relative",zIndex:1 }}>
        {/* SHOP */}
        {tab==="shop" && (
          <div className="fade-up">
            {/* Hero */}
            <div style={{ textAlign:"center",padding:"52px 0 36px" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(34px,6vw,66px)",fontWeight:300,lineHeight:1.1,marginBottom:14 }}>
                <span style={{ fontStyle:"italic",color:"#c9956c" }}>Glow</span> Beyond<br/>Expectations
              </div>
              <p style={{ fontFamily:"'Jost'",color:"#a08070",fontSize:13,letterSpacing:1,marginBottom:28 }}>Premium beauty products curated for you</p>
              <div style={{ display:"flex",gap:12,justifyContent:"center" }}>
                <button className="btn" onClick={()=>setTab("services")}>Book a Service</button>
                <button className="btn-ghost">Explore Collection</button>
              </div>
              <div style={{ display:"flex",gap:36,justifyContent:"center",marginTop:40,borderTop:"1px solid #2a1a1a",paddingTop:28 }}>
                {[["500+","Products"],["4.9★","Rating"],["10k+","Customers"],["Free","On ₹999+"]].map(([v,l])=>(
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:"#c9956c" }}>{v}</div>
                    <div style={{ fontSize:10,color:"#5a4040",letterSpacing:1,textTransform:"uppercase",marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Filters */}
            <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:28,alignItems:"center" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search products..." style={{ maxWidth:220 }} />
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                {CATEGORIES.map(cat=>(
                  <button key={cat} onClick={()=>setCategory(cat)} className={category===cat?"btn btn-sm":"btn-ghost btn-sm"}>{cat}</button>
                ))}
              </div>
            </div>
            {/* Grid */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:18 }}>
              {filtered.map(p=>(
                <div key={p.id} className="card card-hover" style={{ position:"relative",overflow:"hidden" }}>
                  {p.tag && <div style={{ position:"absolute",top:12,left:12,background:TAG_COLOR[p.tag]||"#555",color:"#fff",fontSize:9,fontFamily:"'Jost'",letterSpacing:1,padding:"3px 10px",borderRadius:20,fontWeight:600 }}>{p.tag}</div>}
                  <button onClick={()=>toggleWish(p.id)} style={{ position:"absolute",top:12,right:12,background:"none",border:"none",cursor:"pointer",fontSize:18,color:wishlist.includes(p.id)?"#c9956c":"#3a2a2a",transition:"color .2s" }}>{wishlist.includes(p.id)?"♥":"♡"}</button>
                  <div style={{ height:130,display:"flex",alignItems:"center",justifyContent:"center",fontSize:58,background:"linear-gradient(135deg,#1e1313,#2a1a1a)" }}>{p.emoji}</div>
                  <div style={{ padding:"16px 18px 18px" }}>
                    <div style={{ fontSize:9,color:"#c9956c",letterSpacing:2,textTransform:"uppercase",marginBottom:5 }}>{p.category}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:17,marginBottom:3 }}>{p.name}</div>
                    <div style={{ fontSize:11,color:"#7a6060",marginBottom:12 }}>{p.desc}</div>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:"#e8c4a8" }}>₹{p.price.toLocaleString()}</div>
                        <div style={{ fontSize:10,color:"#7a6060" }}>⭐ {p.rating} · {p.stock} left</div>
                      </div>
                      <button className="btn btn-sm" onClick={()=>addToCart(p)}>+ Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {tab==="services" && (
          <div className="fade-up">
            <SectionTitle title="Our" italic="Services" sub="Book a premium salon experience at your fingertips" />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:18,marginBottom:48 }}>
              {SERVICES.map(s=>(
                <div key={s.name} className="card card-hover" style={{ padding:26,textAlign:"center" }}>
                  <div style={{ fontSize:50,marginBottom:12 }}>{s.emoji}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:6 }}>{s.name}</div>
                  <div style={{ fontSize:11,color:"#a08070",marginBottom:6 }}>⏱ {s.duration}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"#e8c4a8",marginBottom:20 }}>₹{s.price.toLocaleString()}</div>
                  <button className="btn" style={{ width:"100%" }} onClick={()=>bookService(s)}>Book Now</button>
                </div>
              ))}
            </div>
            <SectionTitle title="What They" italic="Say" sub="" />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14 }}>
              {[["Priya S.","The bridal makeup was stunning! I felt like a queen 💍",5],["Ananya R.","Hair spa was so relaxing. Best experience ever 🌸",5],["Meera K.","Nail art was creative and long-lasting. Love it! 💅",5]].map(([n,t,s])=>(
                <div key={n} className="card" style={{ padding:22 }}>
                  <div style={{ color:"#c9956c",fontSize:14,marginBottom:8 }}>{"★".repeat(s)}</div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:"italic",color:"#d4c4b8",marginBottom:12 }}>"{t}"</p>
                  <div style={{ fontSize:11,color:"#7a6060" }}>— {n}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WISHLIST */}
        {tab==="wishlist" && (
          <div className="fade-up">
            <SectionTitle title="Your" italic="Wishlist" sub={`${wishlist.length} saved items`} />
            {wishlist.length===0 ? (
              <div style={{ textAlign:"center",color:"#4a3030",padding:"60px 0" }}>
                <div style={{ fontSize:52,marginBottom:12 }}>♡</div>
                <div style={{ fontSize:13,marginBottom:18 }}>No saved items yet. Heart a product!</div>
                <button className="btn" onClick={()=>setTab("shop")}>Browse Products</button>
              </div>
            ) : (
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:18 }}>
                {products.filter(p=>wishlist.includes(p.id)).map(p=>(
                  <div key={p.id} className="card card-hover" style={{ padding:24,textAlign:"center" }}>
                    <div style={{ fontSize:50,marginBottom:10 }}>{p.emoji}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:17,marginBottom:4 }}>{p.name}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"#e8c4a8",marginBottom:14 }}>₹{p.price.toLocaleString()}</div>
                    <button className="btn" style={{ width:"100%" }} onClick={()=>addToCart(p)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT */}
        {tab==="about" && (
          <div className="fade-up">
            <SectionTitle title="About" italic="Lumière" sub="Premium beauty since 2019" />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:16,marginBottom:40 }}>
              {[["🌿","Cruelty-Free","Ethically sourced, never tested on animals"],["💎","Premium Quality","Luxury formulas from top global brands"],["🚚","Fast Delivery","Same-day city, pan-India in 2-3 days"],["🔄","Easy Returns","Hassle-free 7-day return policy"]].map(([ic,ti,de])=>(
                <div key={ti} className="card" style={{ padding:22,textAlign:"center" }}>
                  <div style={{ fontSize:34,marginBottom:10 }}>{ic}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"#e8c4a8",marginBottom:6 }}>{ti}</div>
                  <div style={{ fontSize:11,color:"#7a6060",lineHeight:1.7 }}>{de}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding:"32px 36px",textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,marginBottom:14 }}>Get in Touch</div>
              <div style={{ fontSize:13,color:"#a08070",lineHeight:2.2 }}>
                📍 12, Rose Garden Street, Chennai – 600001<br/>
                📞 +91 98765 43210 &nbsp;|&nbsp; 📧 hello@lumierebeauty.in<br/>
                🕐 Mon–Sat: 9 AM – 8 PM &nbsp;|&nbsp; Sun: 10 AM – 6 PM
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#0f0a0aee",backdropFilter:"blur(14px)",borderTop:"1px solid #2a1a1a",display:"flex",justifyContent:"space-around",padding:"10px 0 13px",zIndex:40 }}>
        {[["🛍","shop"],["💆","services"],["♡","wishlist"],["ℹ","about"]].map(([ic,t])=>(
          <button key={t} onClick={()=>setTab(t)} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:tab===t?"#c9956c":"#5a4040",transition:"color .2s" }}>
            <span style={{ fontSize:20 }}>{ic}</span>
            <span style={{ fontSize:9,letterSpacing:1,textTransform:"uppercase" }}>{t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── ADMIN PAGE ─────────────────────────────────────────────── */
function AdminPage({ user,onLogout,products,setProducts,orders,setOrders,bookings,setBookings,showToast }) {
  const [tab, setTab] = useState("dashboard");
  const [addModal, setAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name:"",category:"Skincare",price:"",stock:"",desc:"",emoji:"🌸",tag:"" });

  const totalRevenue = orders.reduce((s,o)=>s+o.total,0);
  const totalOrders = orders.length;
  const totalBookings = bookings.length;
  const totalProducts = products.length;

  const addProduct = () => {
    if (!newProduct.name||!newProduct.price) { showToast("Name & price required","error"); return; }
    const p = { ...newProduct, id:Date.now(), price:parseInt(newProduct.price), stock:parseInt(newProduct.stock)||0, rating:4.5 };
    setProducts(prev=>[p,...prev]);
    setAddModal(false);
    setNewProduct({ name:"",category:"Skincare",price:"",stock:"",desc:"",emoji:"🌸",tag:"" });
    showToast("Product added ✓");
  };

  const deleteProduct = (id) => { setProducts(prev=>prev.filter(p=>p.id!==id)); showToast("Product removed"); };
  const updateOrderStatus = (id,status) => { setOrders(prev=>prev.map(o=>o.id===id?{...o,status}:o)); showToast("Status updated ✓"); };
  const updateBookingStatus = (id,status) => { setBookings(prev=>prev.map(b=>b.id===id?{...b,status}:b)); showToast("Booking updated ✓"); };

  const NAV = [["📊","dashboard"],["📦","products"],["🧾","orders"],["📅","bookings"]];

  return (
    <div style={{ display:"flex",minHeight:"100vh",position:"relative",zIndex:1 }}>
      {/* Add Product Modal */}
      {addModal && (
        <>
          <div className="overlay" onClick={()=>setAddModal(false)} />
          <div className="card fade-up" style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",padding:34,width:"min(440px,92vw)",zIndex:200 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,marginBottom:22 }}>Add New Product ✦</div>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div><label>Product Name</label><input placeholder="e.g. Rose Face Wash" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} /></div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <div><label>Category</label>
                  <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})}>
                    {["Skincare","Makeup","Haircare","Fragrance"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label>Tag</label>
                  <select value={newProduct.tag} onChange={e=>setNewProduct({...newProduct,tag:e.target.value})}>
                    <option value="">None</option>
                    {["Bestseller","New","Sale","Luxury"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
                <div><label>Price (₹)</label><input type="number" placeholder="999" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} /></div>
                <div><label>Stock</label><input type="number" placeholder="50" value={newProduct.stock} onChange={e=>setNewProduct({...newProduct,stock:e.target.value})} /></div>
                <div><label>Emoji</label><input placeholder="🌸" value={newProduct.emoji} onChange={e=>setNewProduct({...newProduct,emoji:e.target.value})} /></div>
              </div>
              <div><label>Description</label><input placeholder="Short product description" value={newProduct.desc} onChange={e=>setNewProduct({...newProduct,desc:e.target.value})} /></div>
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end",marginTop:22 }}>
              <button className="btn-ghost" onClick={()=>setAddModal(false)}>Cancel</button>
              <button className="btn" onClick={addProduct}>Add Product ✓</button>
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <div style={{ width:220,background:"#0d0808",borderRight:"1px solid #2a1a1a",display:"flex",flexDirection:"column",padding:"24px 0",flexShrink:0 }}>
        <div style={{ padding:"0 20px 28px",borderBottom:"1px solid #2a1a1a" }}>
          <div style={{ fontSize:18 }}>🌸</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,background:"linear-gradient(135deg,#c9956c,#e8c4a8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Lumière Admin</div>
          <div style={{ fontSize:10,color:"#5a4040",letterSpacing:1,marginTop:4 }}>CONTROL PANEL</div>
        </div>
        <div style={{ flex:1,padding:"18px 12px" }}>
          {NAV.map(([ic,t])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:10,border:"none",background:tab===t?"#1e1313":"none",color:tab===t?"#c9956c":"#5a4040",cursor:"pointer",fontFamily:"'Jost'",fontSize:12,letterSpacing:1,textTransform:"uppercase",marginBottom:4,textAlign:"left",transition:"all .2s",borderLeft:tab===t?"2px solid #c9956c":"2px solid transparent" }}>
              <span style={{ fontSize:16 }}>{ic}</span>{t}
            </button>
          ))}
        </div>
        <div style={{ padding:"16px 14px",borderTop:"1px solid #2a1a1a" }}>
          <div style={{ fontSize:11,color:"#7a6060",marginBottom:4 }}>{user.name}</div>
          <div style={{ fontSize:10,color:"#3a2a2a",marginBottom:10 }}>Administrator</div>
          <button className="btn-ghost" style={{ width:"100%",fontSize:11 }} onClick={onLogout}>Sign Out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1,overflowY:"auto",padding:"28px 28px 60px" }}>

        {/* DASHBOARD */}
        {tab==="dashboard" && (
          <div className="fade-up">
            <div style={{ marginBottom:28 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:32 }}>Dashboard <span style={{ color:"#c9956c" }}>✦</span></div>
              <div style={{ fontSize:12,color:"#7a6060",marginTop:4 }}>Welcome back, {user.name}. Here's today's overview.</div>
            </div>
            {/* Stats */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:16,marginBottom:30 }}>
              {[["Total Revenue","₹"+totalRevenue.toLocaleString(),"📈","#7eb8a8"],["Total Orders",totalOrders,"🧾","#c9956c"],["Bookings",totalBookings,"📅","#9b7fc8"],["Products",totalProducts,"📦","#c97070"]].map(([label,val,ic,col])=>(
                <div key={label} className="card" style={{ padding:22,borderLeft:`3px solid ${col}` }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:10,color:"#7a6060",letterSpacing:1,textTransform:"uppercase",marginBottom:8 }}>{label}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:"#e8c4a8" }}>{val}</div>
                    </div>
                    <span style={{ fontSize:28,opacity:.7 }}>{ic}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Recent Orders */}
            <div className="card" style={{ padding:22,marginBottom:20 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:18 }}>Recent Orders</div>
              <table>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>{orders.slice(0,5).map(o=>(
                  <tr key={o.id}>
                    <td style={{ color:"#c9956c" }}>{o.id}</td>
                    <td>{o.customer}</td>
                    <td style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"#e8c4a8" }}>₹{o.total.toLocaleString()}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td style={{ color:"#7a6060" }}>{o.date}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {/* Top Products */}
            <div className="card" style={{ padding:22 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,marginBottom:18 }}>Top Products</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {products.slice(0,5).map((p,i)=>(
                  <div key={p.id} style={{ display:"flex",alignItems:"center",gap:14,padding:"10px 14px",background:"#1a1010",borderRadius:10 }}>
                    <span style={{ fontSize:11,color:"#5a4040",minWidth:16 }}>#{i+1}</span>
                    <span style={{ fontSize:24 }}>{p.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13,color:"#d4c4b8" }}>{p.name}</div>
                      <div style={{ fontSize:10,color:"#7a6060" }}>{p.category} · {p.stock} in stock</div>
                    </div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"#e8c4a8" }}>₹{p.price.toLocaleString()}</div>
                    <div style={{ fontSize:11,color:"#c9956c" }}>⭐ {p.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab==="products" && (
          <div className="fade-up">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24 }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:30 }}>Products <span style={{ color:"#c9956c" }}>✦</span></div>
                <div style={{ fontSize:12,color:"#7a6060",marginTop:4 }}>{products.length} total products</div>
              </div>
              <button className="btn" onClick={()=>setAddModal(true)}>+ Add Product</button>
            </div>
            <div className="card" style={{ padding:0,overflow:"hidden" }}>
              <table>
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Tag</th><th>Action</th></tr></thead>
                <tbody>{products.map(p=>(
                  <tr key={p.id}>
                    <td><div style={{ display:"flex",alignItems:"center",gap:10 }}><span style={{ fontSize:22 }}>{p.emoji}</span><span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:14 }}>{p.name}</span></div></td>
                    <td style={{ color:"#a08070" }}>{p.category}</td>
                    <td style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"#e8c4a8" }}>₹{p.price.toLocaleString()}</td>
                    <td><span style={{ color:p.stock<20?"#c97070":"#7eb8a8",fontSize:13 }}>{p.stock}</span></td>
                    <td style={{ color:"#c9956c" }}>⭐ {p.rating}</td>
                    <td>{p.tag?<StatusBadge status={p.tag} />:<span style={{ color:"#3a2a2a",fontSize:11 }}>—</span>}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={()=>deleteProduct(p.id)}>Delete</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab==="orders" && (
          <div className="fade-up">
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:30 }}>Orders <span style={{ color:"#c9956c" }}>✦</span></div>
              <div style={{ fontSize:12,color:"#7a6060",marginTop:4 }}>{orders.length} total orders</div>
            </div>
            <div className="card" style={{ padding:0,overflow:"hidden" }}>
              <table>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>{orders.map(o=>(
                  <tr key={o.id}>
                    <td style={{ color:"#c9956c",fontFamily:"'Cormorant Garamond',serif" }}>{o.id}</td>
                    <td>{o.customer}</td>
                    <td style={{ color:"#7a6060",fontSize:11,maxWidth:200 }}>{o.items}</td>
                    <td style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"#e8c4a8" }}>₹{o.total.toLocaleString()}</td>
                    <td style={{ color:"#7a6060",fontSize:11 }}>{o.date}</td>
                    <td>
                      <select value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)} style={{ background:"#1a1010",border:"1px solid #2a1a1a",color:STATUS_COLOR[o.status]||"#d4c4b8",padding:"5px 10px",borderRadius:20,fontSize:11,width:"auto",cursor:"pointer" }}>
                        {["Pending","Processing","Shipped","Delivered"].map(s=><option key={s} style={{ color:"#f5ede6" }}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {tab==="bookings" && (
          <div className="fade-up">
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:30 }}>Bookings <span style={{ color:"#c9956c" }}>✦</span></div>
              <div style={{ fontSize:12,color:"#7a6060",marginTop:4 }}>{bookings.length} salon appointments</div>
            </div>
            <div className="card" style={{ padding:0,overflow:"hidden" }}>
              <table>
                <thead><tr><th>Booking ID</th><th>Customer</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
                <tbody>{bookings.map(b=>(
                  <tr key={b.id}>
                    <td style={{ color:"#c9956c",fontFamily:"'Cormorant Garamond',serif" }}>{b.id}</td>
                    <td>{b.customer}</td>
                    <td style={{ color:"#a08070" }}>{b.service}</td>
                    <td style={{ color:"#7a6060",fontSize:12 }}>{b.date}</td>
                    <td style={{ color:"#7a6060",fontSize:12 }}>{b.time}</td>
                    <td>
                      <select value={b.status} onChange={e=>updateBookingStatus(b.id,e.target.value)} style={{ background:"#1a1010",border:"1px solid #2a1a1a",color:STATUS_COLOR[b.status]||"#d4c4b8",padding:"5px 10px",borderRadius:20,fontSize:11,width:"auto",cursor:"pointer" }}>
                        {["Pending","Confirmed","Cancelled"].map(s=><option key={s} style={{ color:"#f5ede6" }}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── HELPERS ────────────────────────────────────────────────── */
function SectionTitle({ title, italic, sub }) {
  return (
    <div style={{ textAlign:"center",padding:"52px 0 36px" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(30px,5vw,50px)",fontWeight:300,marginBottom:10 }}>
        {title} <span style={{ fontStyle:"italic",color:"#c9956c" }}>{italic}</span>
      </div>
      {sub && <p style={{ fontFamily:"'Jost'",color:"#a08070",fontSize:13,letterSpacing:1 }}>{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span style={{ background:(STATUS_COLOR[status]||"#555")+"22",color:STATUS_COLOR[status]||"#d4c4b8",fontSize:10,fontFamily:"'Jost'",letterSpacing:.5,padding:"4px 11px",borderRadius:20,fontWeight:600,border:`1px solid ${(STATUS_COLOR[status]||"#555")}44` }}>
      {status}
    </span>
  );
}

function SuccessOverlay({ icon, title, sub }) {
  return (
    <div style={{ position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,background:"rgba(0,0,0,.85)" }}>
      <div className="card fade-up" style={{ padding:"50px 60px",textAlign:"center" }}>
        <div style={{ fontSize:60,marginBottom:14 }}>{icon}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:"#e8c4a8",marginBottom:8 }}>{title}</div>
        <div style={{ fontFamily:"'Jost'",color:"#a08070",fontSize:13 }}>{sub}</div>
      </div>
    </div>
  );
}