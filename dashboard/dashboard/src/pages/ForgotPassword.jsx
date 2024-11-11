import {
  clearAllForgotResetPasswordErrors,
  forgotPassword,
} from "@/store/slices/forgotPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* ui component */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton.jsx";

/* logic  */

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl">Forgot Password</CardTitle>
      <CardDescription>
        Enter your email to request for reset password
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
          
            <Link to={'/login'} className="ml-auto inline-block text-sm underline">
              Remember your password
            </Link>
          </div>
        {
          loading ? <SpecialLoadingButton content={"Requesting"}/> : <Button type="submit" className="w-full" onClick={handleForgotPassword}>
          Forgot Password
        </Button>
        }
        
        
      </div>
      </div>
      
    </CardContent>
  </Card>
  )
};

export default ForgotPassword;
