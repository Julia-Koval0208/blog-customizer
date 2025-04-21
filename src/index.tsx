import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false); //здесь хранится состояние формы(открыта или закрыта)
	const [isPage, setIsPage] = useState(defaultArticleState); //здесь хранится состояние страницы

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const handleParamsChange = (newParams: ArticleStateType) => {
		setIsPage(newParams);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': isPage.fontFamilyOption.value,
					'--font-size': isPage.fontSizeOption.value,
					'--font-color': isPage.fontColor.value,
					'--container-width': isPage.contentWidth.value,
					'--bg-color': isPage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				toggleOpenForm={toggleForm}
				isOpen={isOpen}
				onChange={handleParamsChange} // Передаем функцию для обновления параметров
			/>
			<Article />
		</main>
	);
};
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
