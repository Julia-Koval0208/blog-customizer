import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [isPage, setIsPage] = useState(defaultArticleState); //здесь хранится состояние страницы

	const handleParamsChange = (newParams: ArticleStateType) => {
		setIsPage(newParams);
	};

	return (
		<main
			className={styles.main}
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
				onChange={handleParamsChange} // Передаем функцию для обновления параметров
			/>
			<Article />
		</main>
	);
};

export default App;
