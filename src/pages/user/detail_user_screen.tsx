import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseState } from '../../models/base_state';
import { User } from '../../models/user';
import { UserApi } from '../../services/user_api';
import Logo from '../../assets/logo192.png';
import Navbar from '../components/navbar';
import {
  faArrowLeft,
  faUser,
  faHashtag,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Course } from '../../models/course';
import { CourseApi } from '../../services/course_api';

function DetailUserScreen() {
  const { id } = useParams();

  const [state, setState] = useState<BaseState<User>>();
  const [stateCourse, setStateCourse] = useState<BaseState<Course[]>>();

  useEffect(() => {
    UserApi.getUserById(id!, setState);
    CourseApi.getCourseUser(id!, setStateCourse);
  }, []);

  return (
    <div
      className={`w-full h-screen px-5 md:px-20 ${
        state?.loading && 'flex justify-center items-center'
      }`}
    >
      <Navbar />

      <a
        href="/"
        className="flex items-center pt-28 md:pt-32 cursor-pointer hover:font-bold duration-100 w-0"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <h1 className="text-black ml-5">Kembali</h1>
      </a>

      {state?.loading && (
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} width={100} height={100} />
          <h1>Loading....</h1>
        </div>
      )}

      {state?.data && (
        <div className={'w-full my-5 md:my-10 md:w-[50%]'}>
          <div
            className={
              'p-3 w-full shadow-sm border-2 border-gray-200 rounded-lg'
            }
          >
            <div
              className={
                'h-full flex flex-col md:flex-row justify-center items-center md:items-start md:justify-start'
              }
            >
              <div className={' w-32 bg-gray-500 rounded-lg'}>
                <img
                  className={'h-full w-full aspect-square rounded-lg bg-cover'}
                  src={state?.data && state.data.data.profile_url}
                  alt=""
                />
              </div>
              <div
                className={'w-full m-2 md:ml-5 flex justify-between flex-col'}
              >
                <div>
                  <h1
                    className={
                      'text-2xl hidden md:block md:text-left font-bold mb-2'
                    }
                  >
                    Detail
                  </h1>

                  <h1 className="text-2xl text-center font-bold md:hidden">
                    {state.data.data.full_name}
                  </h1>
                  <p className="p-1 mt-2 text-center bg-slate-200 rounded-md md:hidden">
                    {state.data.data.username}
                  </p>
                  <table className={'text-lg hidden md:block'}>
                    <tbody>
                      <tr>
                        <td className={'pr-2'}>
                          <FontAwesomeIcon icon={faHashtag} />
                        </td>
                        <td>
                          <p className="font-bold">Username</p>
                        </td>
                        <td className={'md:pl-10'}>:</td>
                        <td>
                          <p>{state?.data && state?.data.data.username}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className={'pr-2'}>
                          <FontAwesomeIcon icon={faUser} />
                        </td>
                        <td>
                          <p className="font-bold">Nama Lengkap</p>
                        </td>
                        <td className={'md:pl-10'}>:</td>
                        <td>
                          <p>{state?.data && state?.data.data.full_name}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {stateCourse?.data && (
        <div>
          <h1 className="bg-slate-50 mb-5 p-2 rounded-sm text-2xl font-bold text-center">
            Course
          </h1>
          <div
            className={`flex ${
              stateCourse?.data.length > 0
                ? 'flex-wrap'
                : 'justify-center items-center h-[150px]'
            }`}
          >
            {stateCourse?.data.length > 0 ? (
              stateCourse?.data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-evenly items-center w-[150px] h-[150px] md:w-[25%] m-2 p-2 bg-slate-200 shadow-md hover:shadow-lg hover:shadow-blue-200 active:bg-slate-100 duration-100 rounded-md text-center cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="h-10 text-blue-500
                  "
                  />
                  <h1 className="font-bold">{item.data.courseName}</h1>
                </div>
              ))
            ) : (
              <h1> Tidak ada course</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailUserScreen;
