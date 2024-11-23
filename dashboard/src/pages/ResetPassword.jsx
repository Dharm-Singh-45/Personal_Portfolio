import React, { useState,useEffect } from 'react'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
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
import { useDispatch, useSelector } from 'react-redux'
import { clearAllForgotResetPasswordErrors, resetPassword } from '@/store/slices/forgotPasswordSlice'
import { getUser } from '@/store/slices/userSlice';

const ResetPassword = () => {
  const{token} = useParams()
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const {loading,error,message} = useSelector(state=>state.forgotPassword)
  const {isAuthenticated} = useSelector((state) =>state.user)
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

const handleResetPassword=()=>{
  dispatch(resetPassword(token,password,confirmPassword))
}

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
    dispatch(getUser)
  }
}, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
        <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl">Reset Password</CardTitle>
      <CardDescription>
        Set a new password
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label >Password</Label>
          <Input
            
            type="password"
            
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label >Confirm Password</Label>
          <Input
            
            type="password"
      
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {
          loading ? <SpecialLoadingButton content={"Resetting Password"}/> : <Button type="submit" className="w-full" onClick={handleResetPassword}>
         Reset Password
        </Button>
        }
        
        
     
      </div>
      
    </CardContent>
  </Card>
    </>
  )
}

export default ResetPassword
