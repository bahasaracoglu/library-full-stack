import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import API_URLS from "../config/api";

const schema = yup
  .object({
    username: yup.string().required("Bu alan zorunludur."),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsInvalid(false);
  }, [watch("username")]);

  const onSubmit = async (data) => {
    console.log("data", data);
    setLoading(true);
    try {
      // Kullanıcı adı ile kullanıcıyı API'den kontrol et
      const response = await axios.get(API_URLS.USERS.LIST);
      const users = response.data;

      // Eğer kullanıcı varsa ilk bulduğumuzu al
      const user = users.find((user) => user.name === data.username);

      if (user) {
        setCurrentUser(user);
        navigate("/book-list");
      } else {
        setIsInvalid(true);
      }
    } catch (error) {
      console.log(error);
      setIsInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col my-6 w-[93%] p-4 gap-4 rounded-xl max-w-screen-md bg-white shadow-xl md:p-8"
      >
        <h1 className="pt-8 pb-8 font-bold text-xl">Kullanıcı Girişi</h1>
        <div className="flex flex-col gap-2 md:flex-row flex-wrap justify-between">
          <div className="flex flex-col gap-2 md:w-[45%]">
            <label className="flex flex-col justify-between font-bold gap-2">
              Kullanıcı Adı
              <input
                {...register("username", { required: true })}
                placeholder="Kullanıcı Adı"
                className="font-normal p-2 bg-gray-100 rounded-xl outline-blue-400 w-full shadow-sm"
              />
            </label>{" "}
            <p className=" text-red-500 min-h-6">{errors.username?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-24 justify-center">
          {/* Yüklenme durumuna göre button rengini ve içeriğini değiştir */}
          <button
            className={`p-2 text-white font-bold rounded-xl ${
              loading ? "bg-gray-500" : "bg-sky-600"
            }`}
            type="submit"
            disabled={loading} // Yüklenme durumundayken butonu devre dışı bırak
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          {isInvalid && (
            <div className=" bg-rose-100 border-red-400 border p-2 text-center ">
              Giriş bilgisi hatalı!
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export default Login;
