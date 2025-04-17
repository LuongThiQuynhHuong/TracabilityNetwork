import MainPage from '@pages/MainPage/MainPage';
import TracingPage from '@pages/TracingPage/TracingPage';
import { TRACING_ENDPOINT } from '@utils/ConfigConstant';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path={TRACING_ENDPOINT} element={<TracingPage />} />
		</Routes>
	</BrowserRouter>
);

export default App
