import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Login() {

const [showPassword,setShowPassword]=useState(false);
const navigate=useNavigate();

const handleLogin=(e:any)=>{
e.preventDefault();
navigate("/dashboard");
};

return(
<div className="min-h-screen bg-background">

<Navbar/>

<div className="flex items-center justify-center px-4 py-20">

<div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 space-y-6">

<div className="text-center">
<h1 className="text-2xl font-display font-bold text-foreground">Welcome Back</h1>
<p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
</div>

<form className="space-y-4" onSubmit={handleLogin}>

<div className="relative">
<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
<input
type="email"
required
placeholder="Email address"
className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
/>
</div>

<div className="relative">
<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

<input
type={showPassword ? "text":"password"}
required
placeholder="Password"
className="w-full pl-10 pr-10 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
>
{showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
</button>

</div>

<button
type="submit"
className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold hover:brightness-110 transition-all"
>
Sign In
</button>

</form>

<p className="text-center text-sm text-muted-foreground">
Don't have an account?
<Link to="/signup" className="text-primary hover:underline ml-1">
Sign up
</Link>
</p>

</div>
</div>
</div>
);
}
