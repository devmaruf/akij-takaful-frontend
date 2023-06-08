import { useEffect, useState } from "react";
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Link from 'next/link';
import { handleChangeResentPasswordInput, checkUser, changePassword } from '@/redux/actions/auth-action';
import { convertDateTimeToSeconds, formatTime } from "@/utils/remainingTime";

export default function ResetPassword() {

    const dispatch = useDispatch();
    const { resetPasswordInput, isSubmitting, otpStatus, otpExpireTime } = useSelector((state: RootState) => state.Auth);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    const changeTextInput = (name: string, value: any) => {
        dispatch(handleChangeResentPasswordInput(name, value));
    };

    const onSubmit = (e: any) => {
        dispatch(checkUser(resetPasswordInput.email));
        e.preventDefault();
    }


    useEffect(() => {
        if (otpExpireTime) {
            const remainingSeconds = convertDateTimeToSeconds(otpExpireTime);
            setRemainingTime(remainingSeconds);
        }
    }, [otpExpireTime]);


    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime: any) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [remainingTime]);


    const handleChangePassword = (e: React.FormEvent) => {
        dispatch(changePassword(resetPasswordInput));
        e.preventDefault();
    }


    return (
        <section className="md:h-screen py-4 px-6 md:px-10 bg-white text-gray-900 block sm:flex items-center justify-between border-b lg:mt-1.5">
            <div className='block md:flex justify-center items-center w-full'>

                <div className="basis-1 md:basis-1/3 bg-white border border-gray-400 rounded-md p-4 shadow-md">
                    <form>
                        <div className="flex items-center mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                            <p className="text-center font-semibold mx-4 mb-0">Reset Password</p>
                        </div>
                        {
                            (otpStatus === false || remainingTime === 0) ?
                                <div>
                                    <Input
                                        label='Email or Phone'
                                        placeholder='Email or Phone'
                                        name="email"
                                        type="text"
                                        isRequired={true}
                                        value={resetPasswordInput.email}
                                        inputChange={changeTextInput}
                                    />
                                    <Button
                                        title="Submit"
                                        onClick={(e: React.FormEvent) => onSubmit(e)}
                                        position="text-right"
                                        customClass="mt-3"
                                        loadingTitle="Submitting..."
                                        loading={isSubmitting}
                                    />
                                </div> :
                                <div>
                                    <Input
                                        label='OTP'
                                        placeholder='Type otp'
                                        name="otp"
                                        value={resetPasswordInput.otp}
                                        type="otp"
                                        inputChange={changeTextInput}
                                    />

                                    <div className="relative">
                                        <Input
                                            label='Password'
                                            placeholder='Password'
                                            name="password"
                                            value={resetPasswordInput.password}
                                            type={showPassword ? "text" : "password"}
                                            inputChange={changeTextInput}
                                        />
                                        <span className="absolute top-[50%] right-3 cursor-pointer text-xl" onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>
                                            }
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <Input
                                            label='Confirm Password'
                                            placeholder='Confirm Password'
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={resetPasswordInput.confirmPassword}
                                            inputChange={changeTextInput}
                                        />
                                        <span className="absolute top-[50%] right-3 cursor-pointer text-xl" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {
                                                showConfirmPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>
                                            }
                                        </span>
                                    </div>

                                    <div className="text-black text-right mt-2">OTP will be expire after {formatTime(remainingTime)} minutes</div>

                                    <Button
                                        title="Change Password"
                                        onClick={(e: React.FormEvent) => handleChangePassword(e)}
                                        position="text-right"
                                        customClass="mt-3"
                                        loadingTitle="Submitting..."
                                        loading={isSubmitting}
                                    />
                                </div>
                        }

                        <p className="text-sm font-semibold mt-5 pt-1 mb-0 text-center">
                            <Link href="/login" className="text-cyan-600 hover:text-cyan-700 focus:text-cyan-700 transition duration-200 ease-in-out ml-2"
                            >
                                <span className="mr-2"> <i className="bi bi-arrow-left"></i> </span>
                                Back To Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}
