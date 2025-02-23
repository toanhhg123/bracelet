import { loginUser } from "../signup/action";
import FormLogin from "./FormLogin";

const PageLogin = () => {
  return (
    <div className="nc-PageLogin" data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] md:text-5xl md:leading-[115%]">
          Login
        </h2>
        <div className="mx-auto max-w-md">
          <div className="space-y-6">
            <FormLogin login={loginUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
