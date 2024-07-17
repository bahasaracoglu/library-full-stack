import React, { useContext, useEffect, useState } from "react";

import UserMenu from "./UserMenu";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URLS from "../config/api";
import AuthContext from "../context/AuthContext";

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  //console.log("currentUser", currentUser);
  console.log("userBooks", userBooks);
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URLS.BOOKS.LIST);
      setBookList(response.data);
      console.log("setBookList", bookList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`${API_URLS.LOANS.LIST}`);
      console.log("fetchUserBooksresponse", response);
      const userLoans = response.data.filter(
        (loan) =>
          loan.user_id === currentUser.user_id &&
          loan.loan_date &&
          loan.return_date === null
      );
      console.log("userLoans", userLoans);
      setUserBooks(userLoans.map((loan) => loan.book_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserBooks();
  }, []);

  const filterData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URLS.USERS.LIST}/${currentUser.user_id}`
      );
      console.log("response", response);
      const rentedBooks = response.data.books.present;
      console.log("rentedBooks", rentedBooks);
      setBookList(rentedBooks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    // Kitap iade etme fonksiyonu burada olacak
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <UserMenu className="flex self-start w-[93%] bg-indigo-400 text-white font-medium p-4 rounded-xl max-w-screen-md mt-4" />
      <div className="flex flex-col my-6 w-[93%] p-4 gap-4 rounded-xl max-w-screen-md bg-white shadow-xl md:p-8 min-h-[670px] ">
        <h1 className="text-sky-800 font-bold text-xl">
          Hoşgeldiniz, {currentUser.name}
        </h1>
        <h1 className="pt-8 pb-8 font-bold text-xl">Kitap Listesi</h1>
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <button
            className="p-2 text-white font-bold rounded-xl bg-amber-700 w-full hover:bg-amber-600"
            onClick={filterData}
          >
            Ödünç Alınan Kitaplar
          </button>

          <button
            className="p-2 text-white font-bold rounded-xl bg-slate-500 w-full hover:bg-slate-400"
            onClick={fetchData}
          >
            Tüm Kitaplar
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center my-auto ">
            <Loader />
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {bookList.length <= 0
              ? "Herhangi bir kitap ödünç alınmadı."
              : bookList.map((book) => (
                  <li
                    key={book.book_id}
                    className="bg-slate-200 p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-center border-b border-indigo-200 pb-2">
                      <span className="font-medium w-1/2">Kitap Adı</span>
                      <span className="ml-auto text-left w-1/2 overflow-hidden overflow-ellipsis">
                        {book.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-indigo-200 py-2">
                      <span className="font-medium w-1/2">
                        Müsaitlik Durumu
                      </span>
                      <span className="ml-auto text-left w-1/2 overflow-hidden overflow-ellipsis">
                        {book.is_loaned ? (
                          <span className="text-yellow-600 font-medium">
                            Müsait Değil
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-medium">
                            Müsait
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      {!userBooks.includes(book.book_id) && !book.is_loaned && (
                        <div className="flex flex-col justify-center items-center rounded-xl mt-3 p-1 bg-emerald-700 text-white font-medium w-[170px] hover:scale-105">
                          <Link className="hover:text-blue-700">Ödünç Al</Link>
                        </div>
                      )}
                      {userBooks.includes(book.book_id) && (
                        <div
                          onClick={() => deleteData(book.book_id)}
                          className="flex flex-col justify-center items-center rounded-xl mt-3 p-1 bg-red-700 text-white font-medium w-[170px] hover:scale-105 hover:cursor-pointer"
                        >
                          İade Et
                        </div>
                      )}
                    </div>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default BookList;
