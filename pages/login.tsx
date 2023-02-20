import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Link from 'next/link';
import { changeInputValue, handleLogin } from '@/redux/actions/auth-action';

export default function Login() {

    const dispatch = useDispatch();
    const { loginInput, isSubmitting } = useSelector((state: RootState) => state.Auth);

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const onSubmit = (e: any) => {
            dispatch(handleLogin(loginInput));
        e.preventDefault();
    }

    return (
        <section className="md:h-screen py-4 px-6 md:px-10 bg-white text-gray-900 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className='block md:flex justify-between items-center w-full'>
                <div className="basis-1 md:basis-1/2">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-[90%]"
                        alt=""
                    />
                </div>
                <div className="basis-1 md:basis-1/2">
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                    >
                        <h4 className="text-lg font-bold">Akij Takaful Life Insurance</h4>
                        <div className="flex items-center mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                            <p className="text-center font-semibold mx-4 mb-0">Login</p>
                        </div>
                        <Input
                            label='Email'
                            placeholder='Email'
                            name="email"
                            type="email"
                            value={loginInput.email}
                            inputChange={changeTextInput}
                        />
                        <Input
                            label='Password'
                            placeholder='Password'
                            name="password"
                            value={loginInput.password}
                            type="password"
                            inputChange={changeTextInput}
                        />
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
                            <Link href="/forget-password" className="text-gray-800">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="text-center lg:text-left">
                            <Button
                                title="Login"
                                onClick={(e) => onSubmit(e)}
                                position="text-left"
                                loading={isSubmitting}
                            />

                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}
