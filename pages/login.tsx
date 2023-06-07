import { useEffect, useState } from "react";
import Image from "next/image";
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Link from 'next/link';
import { changeInputValue, changeOtpInputValue, handleLogin, handleOtpLogin } from '@/redux/actions/auth-action';
import { convertDateTimeToSeconds, formatTime } from "@/utils/remainingTime";

export default function Login() {
    const dispatch = useDispatch();
    const [viewMoreCredential, setViewMoreCredential] = useState<boolean>(false);
    const { loginInput, isSubmitting, otpStatus, otpExpireTime, otpInput } = useSelector((state: RootState) => state.Auth);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const changeOtpTextInput = (name: string, value: any) => {
        dispatch(changeOtpInputValue(name, value));
    };

    const onSubmit = (e: any) => {
        dispatch(handleLogin(loginInput));
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


    const onOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(handleOtpLogin(loginInput, otpInput));
    }

    return (
        <section className="md:h-screen py-4 px-6 md:px-10 bg-white text-gray-900 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className='block md:flex justify-between items-center w-full'>
                <div className="basis-1 md:basis-1/2">
                    <Image src={'/images/login_bg.webp'} alt={'Login Background'} height={100} width={100} priority={true} className="w-[90%]" unoptimized />
                </div>
                <div className="basis-1 md:basis-1/2">
                    <form method="post" autoComplete="off">
                        <div className="flex justify-center items-center mb-10">
                            <Image src={'/images/banner.png'} alt={''} height={80} width={300} unoptimized />
                        </div>
                        {otpStatus === false && remainingTime === 0
                            ? <div>
                                <div className="flex items-center mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-semibold mx-4 mb-0">
                                        Login
                                    </p>
                                </div>

                                <Input
                                    label='Email'
                                    placeholder='Email'
                                    name="email"
                                    type="email"
                                    value={loginInput.email}
                                    inputChange={changeTextInput}
                                />
                                <div className="relative">
                                    <Input
                                        label='Password'
                                        placeholder='Password'
                                        name="password"
                                        value={loginInput.password}
                                        type={showPassword ? "text" : "password"}
                                        inputChange={changeTextInput}
                                    />
                                    <span className="absolute top-[50%] right-3 cursor-pointer text-xl" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>
                                        }
                                    </span>

                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label
                                            className="form-check-label inline-block text-gray-800"
                                            htmlFor="exampleCheck2"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <div>
                                        <Link href="/forget-password" className="text-gray-800">
                                            Forgot password?
                                        </Link>
                                        <i
                                            className="bi bi-gear cursor-pointer ml-5"
                                            title="Click to view other login credentials"
                                            onClick={() => setViewMoreCredential(!viewMoreCredential)}
                                        ></i>
                                    </div>
                                </div>

                                <div className="text-center lg:text-left">
                                    <Button
                                        title="Login"
                                        onClick={(e: React.FormEvent) => onSubmit(e)}
                                        position="text-left"
                                        loadingTitle="Logging"
                                        loading={isSubmitting}
                                    />
                                </div>
                            </div> :
                            <div>
                                <div className="flex items-center mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-semibold mx-4 mb-0">
                                        Login With OTP
                                    </p>
                                </div>
                                <Input
                                    label='OTP'
                                    placeholder='Type otp'
                                    name="otp"
                                    value={otpInput.otp}
                                    type="otp"
                                    inputChange={changeOtpTextInput}
                                />
                                {
                                    remainingTime > 0 &&
                                    <div className="text-black text-right mt-2">OTP will be expire after {formatTime(remainingTime)} minutes</div>
                                }
                                <div className="text-center lg:text-left flex gap-2">
                                    <Button
                                        title="Submit OTP"
                                        onClick={(e: React.FormEvent) => onOtpSubmit(e)}
                                        position="text-left"
                                        loadingTitle="Submitting"
                                        loading={(isSubmitting && remainingTime > 0) ? true : false}
                                    />
                                    <div>
                                        <Button
                                            title={"Resend Code"}
                                            onClick={(e: React.FormEvent) => onSubmit(e)}
                                            position="text-left"
                                            loadingTitle="Resending..."
                                            loading={(isSubmitting && remainingTime === 0) ? true : false}
                                            disabled={remainingTime > 0}
                                            variant="default"
                                        />
                                        <p className="text-xs text-blue-400">{remainingTime > 0 && "Please wait to resend code again!"}</p>
                                    </div>
                                </div>
                            </div>

                        }

                        {
                            viewMoreCredential &&
                            <div className="flex flex-row justify-center items-center flex-wrap">
                                <div className="max-w-[250px] text-sm bg-slate-100 mt-3 p-3 mr-2">
                                    <b>Superadmin</b><br />
                                    -----------------<br />
                                    admin@example.com<br />
                                    12345678
                                </div>
                                <div className="max-w-[250px] text-sm bg-slate-100 mt-3 p-3 mr-2">
                                    <b>Bank Admin</b><br />
                                    -----------------<br />
                                    bank_admin@example.com<br />
                                    12345678
                                </div>
                                <div className="max-w-[250px] text-sm bg-slate-100 mt-3 p-3 mr-2">
                                    <b>Agent 1</b><br />
                                    -----------------<br />
                                    agent1@example.com<br />
                                    12345678
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </section>
    )
}
