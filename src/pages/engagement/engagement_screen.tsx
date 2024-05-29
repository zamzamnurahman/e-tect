import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import BackButton from '../components/back_button';
import ProfileUserComponent from '../user/profile_user';
import CollapseSection from '../components/collapse_section';
import { useEffect, useState } from 'react';
import { BaseState } from '../../models/base_state';
import { DataEngagement, EngagementImage } from '../../models/engagement';
import { EngagementApi } from '../../services/engagement_api';
import { CleaningImageApi } from '../../services/cleaning_api';
import { ExpressionImageApi } from '../../services/expression_api';

function EngagementScreen() {
  const { userId } = useParams();
  const query = new URLSearchParams(window.location.search);
  const topicId = query.get('topicId');

  const [stateProctoring, setStateProctoring] =
    useState<BaseState<DataEngagement[]>>();
  const [stateCleaning, setStateCleaning] =
    useState<BaseState<EngagementImage[]>>();
  const [stateExpression, setStateExpression] =
    useState<BaseState<EngagementImage[]>>();

  useEffect(() => {
    EngagementApi.getDetailEngagement(userId!, setStateProctoring);
    CleaningImageApi.getCleaningImage(userId!, topicId!, setStateCleaning);
    ExpressionImageApi.getExpresssionImage(
      userId!,
      topicId!,
      setStateExpression
    );
  }, []);

  return (
    <div>
      <Navbar />
      <div className="py-28 px-5 md:px-20">
        <BackButton title={`Engagement Menu`} />

        <ProfileUserComponent id={userId} />

        <CollapseSection
          title={`Proctoring Image (${stateProctoring?.totalData ?? 0})`}
          defaultExpanded={true}
          children={
            <div>
              {stateProctoring?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="w-full p-5 flex overflow-x-scroll">
                  {stateProctoring?.data?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-5 bg-slate-100 rounded-lg border-black object-cover"
                        src={item.image_url}
                        alt={item.image_url}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          }
        />
        <CollapseSection
          title={`Cleaning Image (${stateCleaning?.totalData})`}
          defaultExpanded={true}
          children={
            <div>
              {stateCleaning?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="w-full p-5 flex overflow-x-scroll">
                  {stateCleaning?.data?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-5 bg-slate-100 rounded-lg border-black object-cover"
                        src={item.image_url}
                        alt={item.image_url}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          }
        />
        <CollapseSection
          title={`Expressions Image (${stateExpression?.totalData})`}
          defaultExpanded={true}
          children={
            <div>
              {stateExpression?.loading ? (
                <div className="p-5"> Loading... </div>
              ) : (
                <div className="w-full p-5 flex overflow-x-scroll">
                  {stateExpression?.data?.map((item, index) => {
                    return (
                      <img
                        key={index}
                        className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-5 bg-slate-100 rounded-lg border-black object-cover"
                        src={item.image_url}
                        alt={item.image_url}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
}

export default EngagementScreen;
