import { configureStore } from "@reduxjs/toolkit";
import addCourseSlice from "../APIRedux/CourseReducer/AddCourseReducer";
import getCourseSlice from "../APIRedux/CourseReducer/GetCourseReducer";
import deleteCourseSlice from "../APIRedux/CourseReducer/DeleteCourseReducer";
import updateCourseSlice from "../APIRedux/CourseReducer/UpdateCourseReducer";
import addQuestionSlice from "../APIRedux/QuestionReducer/AddQuestionReducer";
import getQuestionSlice from "../APIRedux/QuestionReducer/GetQuestionReducer";
import deleteQuestionSlice from "../APIRedux/QuestionReducer/DeleteQuestionReducer";
import updateQuestionSlice from "../APIRedux/QuestionReducer/UpdateQuestionReducer";
import createTestSlice from "../APIRedux/TestReducer/TestReducerCreate";
import getTestSlice from "../APIRedux/TestReducer/TestReducerGet"; 
import updateTestSlice from "../APIRedux/TestReducer/TestReducerUpdate";
import deleteTestSlice from "../APIRedux/TestReducer/TestReducerDelete";
import totalUserCountSlice from "../APIRedux/AnalyticsReducer/TotalUserCountReducer";
import totalTestCountSlice from "../APIRedux/AnalyticsReducer/TotalTestAttemptReducer";
import bulkQuestionSlice from "../APIRedux/BulkQuestionReducer/BulkQuestionReducer";
import  addUserAttemptSlice  from "../APIRedux/UserAttemptReducer/UserAttemptReducer";
import  getUserAttemptSlice  from "../APIRedux/UserAttemptReducer/GetAttemptReducer";
import AddPlanSlice from "../APIRedux/PlanReducer/PlanReducerCreate";
import GetAllPlansSlice from "../APIRedux/PlanReducer/PlanReducerGet";
import UpdatePlanSlice from "../APIRedux/PlanReducer/PlanReducerEdit";
import DeletePlanSlice from "../APIRedux/PlanReducer/PlanReducerDelete";
import AddPromocodeSlice from "../APIRedux/PromocodeReducer/PromocodeCreate";
import GetPromocodesSlice  from "../APIRedux/PromocodeReducer/PromocdeGetAll";
import EditPromocodeSlice from "../APIRedux/PromocodeReducer/PromocodeEdit";
import DeletePromocodeSlice from "../APIRedux/PromocodeReducer/PromocodeDelete";

export const store = configureStore({
    reducer:{
         addCourse: addCourseSlice,
         getCourse:  getCourseSlice,
         deleteCourse: deleteCourseSlice,
         updateCourse: updateCourseSlice,
         addQuestion: addQuestionSlice,
         getQuestion: getQuestionSlice,
         deleteQuestion: deleteQuestionSlice,
         updateQuestion: updateQuestionSlice,
         createTest: createTestSlice,
         getTests:getTestSlice,
         updateTest:updateTestSlice,
         deleteTest:deleteTestSlice,
        totalUserCount:totalUserCountSlice,
        totalTestCount:totalTestCountSlice,
        bulkQuestion: bulkQuestionSlice,
        addUserAttempt:addUserAttemptSlice,
        getUserAttempt:getUserAttemptSlice,
        AddPlan:AddPlanSlice,
        GetAllPlans:GetAllPlansSlice,
        UpdatePlan:UpdatePlanSlice,
        DeletePlan:DeletePlanSlice,
        AddPromocode:AddPromocodeSlice,
        GetPromocodes:GetPromocodesSlice,
        EditPromocode:EditPromocodeSlice, 
        DeletePromocode:DeletePromocodeSlice
         
    }
})