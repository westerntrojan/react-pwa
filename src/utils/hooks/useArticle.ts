import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';

import {RootState, IArticle} from '@store/types';
import {getArticle} from '@store/articles/actions';

type ReturningData = [IArticle | null, (slug: string) => void];

export default (): ReturningData => {
	const [article, setArticle] = useState<IArticle | null>(null);
	const [slug, setSlug] = useState('');

	const dispatch = useDispatch();

	const mainArticle = useSelector(
		(state: RootState) => state.articles.all.find(a => a.slug === slug),
		shallowEqual,
	);
	const cacheArticle = useSelector(
		(state: RootState) => state.articles.cache.find(a => a.slug === slug),
		shallowEqual,
	);

	const setArticleSlug = (slug: string) => {
		setSlug(slug);
	};

	const findArticle = useCallback(() => {
		if (slug) {
			if (mainArticle) {
				setArticle(mainArticle);
			} else if (cacheArticle) {
				setArticle(cacheArticle);
			} else {
				if (!article) {
					dispatch(getArticle(slug));
				}
			}
		}
	}, [slug, mainArticle, cacheArticle, dispatch, article]);

	useEffect(() => {
		findArticle();
	}, [findArticle]);

	return [article, setArticleSlug];
};
