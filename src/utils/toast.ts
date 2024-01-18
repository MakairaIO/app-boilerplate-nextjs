import { toast as _toast, ToastOptions, TypeOptions } from "react-toastify";

export const toast = (message: string, type: TypeOptions = 'default') => {
	const toastConfig: ToastOptions = {
		position: 'top-center',
		autoClose: 1000,
		hideProgressBar: true,
		closeButton: false,
		type,
	};

	_toast(message, toastConfig);
}