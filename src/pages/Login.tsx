import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hook";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const defaultValues = {
    username: "admin",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastID = toast.loading("Logging In...");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Logged In", { id: toastID, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastID, duration: 2000 });
    }
  };

  return (
    <div>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="username" label="Username: " />
        <PHInput type="text" name="password" label="password: " />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </div>
  );
};

export default Login;
