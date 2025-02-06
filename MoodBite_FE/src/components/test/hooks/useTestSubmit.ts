import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {submitTestResultAsync} from "../../../slice/testSlice";
import {TestResultPostDTO} from "../../../types/test";

export function useTestSubmit() {
    const dispatch = useDispatch<any>();

    const submitTestResult = useCallback(
        async (dto:TestResultPostDTO) => {

        // @ts-ignore
        if (window.confirm("결과를 확인하시겠습니까?")) {

            try {
                await dispatch(submitTestResultAsync(dto));
                // @ts-ignore
                alert(modeText[mode].successMessage);
            } catch (e) {
                console.log('error message : ', e)
            }
        }
    }, [dispatch]);

    return{
        submitTestResult
    }
}