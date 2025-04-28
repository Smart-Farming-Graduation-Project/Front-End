// "use client";
// import { Button } from "@/components/ui/button";
// import { FaFacebook } from "react-icons/fa6";
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function FacebookSignButton({ typePage }: { typePage: string }) {
//   const [loading, setLoading] = useState(false);

//   const handleFacebookLogin = () => {
//     setLoading(true);
//     signIn("facebook", { 
//       callbackUrl: typePage === "signin" ? "/" : "/signin",
//       redirect: true
//     });
//   };

//   return (
//     <Button 
//       variant="outline" 
//       disabled={loading} 
//       className="w-full flex items-center justify-center gap-2 py-3 sm:py-[20px]" 
//       onClick={handleFacebookLogin}
//     >
//       <FaFacebook className="text-blue-600" size={20} />
//       <span>
//         {loading ? "Redirecting..." : `${typePage === "signin" ? "Sign in" : "Sign up"} with Facebook`}
//       </span>
//     </Button>
//   );
// }