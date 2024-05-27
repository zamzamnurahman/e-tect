import axios from 'axios';
import { ConstantApp } from '../constant/constant';
import { BaseState } from '../models/base_state';
import { Course } from '../models/course';

export class CourseApi {
  static async getCourseUser(username: string, setData: any) {
    setData(BaseState.loading());
    try {
      let url: string = `${ConstantApp.BASEURL}/course/user/${username}`;
      let response = await axios.get(url);
      if (response.status === 200) {
        let responseJson = response.data.data;

        let courses: Course[] = responseJson.map((item: any) => item as Course);
        setData(BaseState.success(courses));
      } else {
        setData(BaseState.error(`Error get data ${username} from server`));
      }
    } catch (error) {
      console.error(error);
      setData(BaseState.error(`Error get data ${username} from server`));
    }
  }
}
