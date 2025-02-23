import { register } from "./action";
import FormRegister from "./FormRegister";

const PageSignUp = () => {
  return (
    <div className="nc-PageSignUp " data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] md:text-5xl md:leading-[115%]">
          Signup
        </h2>
        <div className="mx-auto max-w-md ">
          <FormRegister registerUser={register} />
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
