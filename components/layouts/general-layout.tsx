import { ToastContainer } from "react-toastify";

export default function GeneralLayout({ children }) {
	return (
		<>
			<ToastContainer />
			{children}
		</>
	);
}
