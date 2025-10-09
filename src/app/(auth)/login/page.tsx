import Link from "next/link";

export default function LogIn() {
  const inpStyle =
    "glass w-full h-[45px] px-4 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 hover:backdrop-blur-lg hover:bg-white/20";

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-[25rem] pt-10 pr-10 pl-10 pb-5 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <form className="flex flex-col gap-6">
            <h1 className="text-white text-xl">Log In</h1>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="login"
              className={inpStyle}
              placeholder="login or email"
            />
            <input
              type="password"
              name="password"
              className={inpStyle}
              placeholder="password"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between pr-3 pl-3">
              <label htmlFor="" className="flex gap-2  text-white">
                <input type="checkbox" name="" id="" className="w-4"/>
                Remember me
              </label>
              <p className="text-white  gap-2 flex ">
                <Link href="/recovery" scroll={false}>
                  Forgot password
                </Link>
              </p>
            </div>
            <button
              type="button"
              className="w-full text-lg p-2 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-md backdrop-saturate-150 shadow-md hover:shadow-lg hover:backdrop-blur-lg hover:bg-white/20 transition-all duration-300 ease-in-out"
            >
              Log In
            </button>
          </div>
          <p className="text-white text-center flex flex-col ">
            Нет аккаунта?
            <Link href="/signup" scroll={false}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
