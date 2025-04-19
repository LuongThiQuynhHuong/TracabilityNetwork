import { format, parseISO } from "date-fns";
import { ToastStatus } from "./AppConstant";

//Custom toast util functions
export const UpdateToastStatus = (status: ToastStatus, setToastBodyText: (text: string) => void, setToastStatus: (status: ToastStatus) => void, toastBodyText: string = '') => {
    setToastStatus(status);
    switch (status) {
        case ToastStatus.Loading:
            setToastBodyText(toastBodyText != '' ? toastBodyText : 'Please wait while we submit your data.');
            break;
        case ToastStatus.Success:
            setToastBodyText(toastBodyText != '' ? toastBodyText : 'Your product was added successfully!');
            break;
        case ToastStatus.Error:
            setToastBodyText(toastBodyText != '' ? toastBodyText : 'There was an error. Please try again.');
            break;
        default:
            setToastBodyText('');
    }
}

export const OnCloseCustomToast = (currentStatus: ToastStatus, setToastStatus: (status: ToastStatus) => void, setShowToast: (fShow: boolean) => void) => {
    if (currentStatus === ToastStatus.Loading)
        return;

    setToastStatus(ToastStatus.None);
    setShowToast(false);
}

export const GetServerValidDateTimeFormat = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };