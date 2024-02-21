import {DataEngagement, Engagement} from '../models/engagement';
import axios from "axios";
import {ConstantApp} from "../constant/constant";
import {BaseState} from "../models/base_state";

export class EngagementApi {

    // all data result engagement
    static async getEngagements(page: number, setData: any, setTempData: any){
        setData(BaseState.loading())
        try {
            let url : string = `${ConstantApp.BASEURL}/proctoring?page=${page}&limit=10`
            let response = await axios.get(url)
            if(response.status === 200){
                let responseJson = response.data.data
                // change to model engagement
                let engagements: Engagement[] = responseJson.map((item: any) => item as Engagement)
                setTempData(engagements)
                setData(BaseState.success(engagements))
            }else{
                setData(BaseState.error("Error get data from server"))
            }
        } catch (error) {
            console.error(error)
            setData(BaseState.error("Error get data from server"))
        }
    }

    // detail data result engagement
    static async getDetailEngagement(engagementId:string, setData: any){
        setData(BaseState.loading())
        try {
            let url : string = `${ConstantApp.BASEURL}/proctoring/${engagementId}`
            let response = await axios.get(url)
            if(response.status === 200){
                let responseJson = response.data
                // change to model engagement
                let engagements: DataEngagement[] = responseJson.map((item: any) => item as DataEngagement)
                setData(BaseState.success(engagements))
            }else{
                setData(BaseState.error(`Error get data ${engagementId} from server`))
            }
        }catch (error){
            console.error(error)
            setData(BaseState.error(`Error get data ${engagementId} from server`))
        }
    }
}