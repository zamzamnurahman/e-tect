import { useEffect, useState } from 'react';
import { BaseState } from '../../models/base_state';
import { User } from '../../models/user';
import { UserApi } from '../../services/user_api';
import { useNavigate } from 'react-router-dom';
import { CardUser, CardUserLoading } from '../components/card_user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/navbar';

function DashboardScreen() {
  let navigate = useNavigate();

  const [data, setData] = useState<BaseState<any[]>>();
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

  function handleSearch(e: any) {
    e.preventDefault();
    let fullname = e.target.value;
    if (fullname === '') UserApi.getAllUser(1, setData);
    UserApi.searchUser(fullname, setData);
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
      <Navbar
        actions={
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
              onChange={(e) => handleSearch(e)}
            />
          </div>
        }
      />
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
