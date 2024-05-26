import { useEffect, useState } from 'react';
import Logo from '../../assets/logo192.png';
import { ConstantApp } from '../../constant/constant';
import { BaseState } from '../../models/base_state';
import { User } from '../../models/user';
import { UserApi } from '../../services/user_api';
import { useNavigate } from 'react-router-dom';
import { CardUser, CardUserLoading } from '../components/card_user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function DashboardScreen() {
  let navigate = useNavigate();

  const [data, setData] = useState<BaseState<User[]>>();
  let users: User[] | undefined = data?.data;

  useEffect(() => {
    UserApi.getAllUser(1, setData);
  }, []);

  function handleClick(e: any, userId: number) {
    e.preventDefault();
    navigate(`/detail/${userId}`);
  }

  function listComponent() {
    if (data?.loading) {
      let components = [];
      for (let i = 0; i < 20; i++) {
        components.push(<CardUserLoading key={i} />);
      }
      return components;
    } else {
      return users?.map((item) => {
        return CardUser(item, (e: any) => handleClick(e, item._id));
      });
    }
  }

  function numberPageIndicator() {
    let components = [];
    for (let i = 0; i < data?.lastPage!; i++) {
      components.push(
        <button
          key={i}
          className={
            'py-2 px-4 ' +
            (data?.page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white')
          }
          onClick={(e) => {
            UserApi.getAllUser(i + 1, setData);
          }}
        >
          {i + 1}
        </button>
      );
    }
    return components;
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className=" flex flex-wrap items-center justify-center md:justify-between mx-auto p-5">
          <div className={'flex'}>
            <img
              src={Logo}
              alt=""
              className={'h-12 w-12 md:mr-5'}
              onClick={(e) => {
                console.log(`current page ${data?.page! + 1}`);
              }}
            />
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {ConstantApp.NAME}
              </span>
            </a>
          </div>
          <div className={'flex items-center w-full md:w-[30%] p-2'}>
            <FontAwesomeIcon
              icon={faSearch}
              className={'hover:cursor-pointer'}
            />
            <input
              className={
                'bg-gray-100 rounded-lg border-2 shadow-sm border-gray-200 w-full p-2 mx-2'
              }
              type="text"
              name="search"
              id="search"
              placeholder={'Silahkan cari dengan nama'}
            />
          </div>
        </div>
      </nav>
      <div className={'m-3 pt-32 pb-10 grid grid-cols-2 md:grid-cols-6 gap-4'}>
        {listComponent()}
      </div>

      {/* page indicator */}
      <div className={' w-full py-5 my-5'}>
        <div className={'flex justify-center items-center'}>
          {data?.page !== 1 ? (
            <button
              className={'py-2 px-4 '}
              onClick={(e) => {
                UserApi.getAllUser(data?.page! - 1, setData);
              }}
            >
              Prev
            </button>
          ) : null}
          <div className={'mx-5'}>{numberPageIndicator()}</div>
          {data?.page !== data?.lastPage ? (
            <button
              className={'py-2 px-4 '}
              onClick={(e) => {
                UserApi.getAllUser(data?.page! + 1, setData);
              }}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default DashboardScreen;
