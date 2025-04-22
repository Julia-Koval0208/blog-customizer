import React, { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import Text from '../../ui/text/Text';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface PropsParamsForm {
	onChange: (arg: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onChange }: PropsParamsForm) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false); //здесь хранится состояние формы(открыта или закрыта)
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const [articleParams, setArticleParams] = //здесь хранится состояние формы(ее параметров)
		useState<ArticleStateType>(defaultArticleState);

	const handleParamChange = // изменение параметров
		(param: keyof ArticleStateType) => (option: OptionType) => {
			setArticleParams((prev) => ({
				...prev,
				[param]: option,
			}));
		};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(articleParams); // Вызываем функцию для обновления параметров в родительском компоненте
	};

	const resetForm = () => {
		// сброс параметров до дефолтных
		setArticleParams(defaultArticleState);
		onChange(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: rootRef,
		onClose: toggleForm,
		onChange: setIsMenuOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as={'h3'}
						align={'center'}
						size={31}
						weight={800}
						uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={articleParams.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleParamChange('fontFamilyOption')}
					/>
					<RadioGroup
						selected={articleParams.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={handleParamChange('fontSizeOption')}
						name='fontSize'
					/>
					<Select
						selected={articleParams.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleParamChange('fontColor')}
					/>
					<Select
						selected={articleParams.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleParamChange('backgroundColor')}
					/>
					<Select
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleParamChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
