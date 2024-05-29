import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {BaseState} from '../../models/base_state';
import {User} from '../../models/user';
import {UserApi} from '../../services/user_api';
import Logo from '../../assets/logo192.png';
import Navbar from '../components/navbar';
import {
    faArrowLeft,
    faUser,
    faHashtag,
    faFolder,
    faFile,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Course} from '../../models/course';
import {CourseApi} from '../../services/course_api';
import {Topic} from '../../models/topic';
import ProfileUserComponent from "./profile_user";
import BackButton from "../components/back_button";

function DetailUserScreen() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [isSelectCourse, setIsSelectCourse] = useState<boolean>(false);

    const [stateCourse, setStateCourse] = useState<BaseState<Course[]>>();
    const [stateTopics, setStateTopics] = useState<BaseState<Topic[]>>();

    useEffect(() => {
        CourseApi.getCourseUser(id!, setStateCourse);
    }, []);

    async function handleSelectCourse(courseId: number) {
        setIsSelectCourse(!isSelectCourse);

        if (!isSelectCourse) {
            await CourseApi.getTopicsCourse(id!, courseId, setStateTopics);
        }
        // change isSelected to true
        let course: Course[] = [];
        stateCourse?.data?.forEach((item) => {
            if (item._id === courseId) {
                item.data.isSelected = !isSelectCourse;
            }
            course.push(item);
        });

        setStateCourse(BaseState.success(course));
    }

    return (
        <div
            className={`w-full`}
        >
            <Navbar/>

            <div className={`pt-28 px-5 md:px-20`}>
                <BackButton title={`Detail User`}/>

                <ProfileUserComponent id={id}/>


                {stateCourse?.data && (
                    <div className="w-full flex">
                        <div className="w-full mr-2">
                            <h1 className="bg-slate-50 mb-5 p-2 rounded-sm text-2xl text-center">
                                Courses
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
                                            className={`flex flex-col justify-evenly items-center w-[150px] h-[150px] md:w-[25%] m-2 p-2 bg-slate-100 shadow-md hover:border border-black active:bg-slate-50 ${
                                                item.data.isSelected != null &&
                                                item.data.isSelected === true
                                                    ? 'border-2 border-black'
                                                    : ''
                                            } duration-100 rounded-md text-center cursor-pointer`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSelectCourse(item._id);
                                            }}
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
                        <div
                            className={`w-full ml-2 ${
                                isSelectCourse ? 'inline-block' : 'hidden'
                            }`}
                        >
                            <h1 className="bg-slate-50 mb-5 p-2 rounded-sm text-2xl text-center">
                                Topics
                            </h1>
                            {stateTopics?.loading &&
                                [1, 2, 3, 4].map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="w-full h-14 bg-slate-100 animate-pulse shadow-md p-3 mb-4 rounded-md flex items-center hover:border hover:border-black active:bg-slate-50 duration-200 transition-all cursor-pointer"
                                        ></div>
                                    );
                                })}
                            {stateTopics?.data &&
                                stateTopics?.data.map((topic) => {
                                    return (
                                        <div
                                            key={topic._id}
                                            className="bg-slate-100 shadow-md p-3 mb-4 rounded-md flex items-center hover:border hover:border-black active:bg-slate-50 duration-200 transition-all cursor-pointer"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate(`/engagement/${id}?topicId=${topic._id}`)
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFile}
                                                className="h-10 text-orange-300"
                                            />
                                            <h1 className="font-bold ml-5">{topic.quiz_name}</h1>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default DetailUserScreen;
