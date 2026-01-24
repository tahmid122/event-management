import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <section className="uni-gap">
      <div className="container">
        {/* main */}
        <div className="min-h-[80vh] flex items-center justify-center">
          <SignupForm />
        </div>
      </div>
    </section>
  );
};

export default Signup;
