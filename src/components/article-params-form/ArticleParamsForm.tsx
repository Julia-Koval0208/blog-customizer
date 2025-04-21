import React, { useState } from 'react';
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
import { OnClick } from 'src/ui/arrow-button/ArrowButton';

interface PropsParamsForm {
	toggleOpenForm: OnClick;
	isOpen: boolean;
	onChange: (arg: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	toggleOpenForm,
	isOpen,
	onChange,
}: PropsParamsForm) => {
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

	return (
		<>
			<ArrowButton onClick={toggleOpenForm} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
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
		</>
	);
};
