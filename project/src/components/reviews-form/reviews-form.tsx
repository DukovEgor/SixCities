import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks';
import { fetchNewReviewAction } from '../../store/api-actions';
import { INewReview } from '../../types/review';

export default function ReviewsForm({ id }: { id: number }): JSX.Element {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm<INewReview>({ mode: 'onChange' });

  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit: SubmitHandler<INewReview> = (data) => {
    setIsDisabled(true);
    dispatch(fetchNewReviewAction({ ...data, id, reset, setIsDisabled }));
  };

  useEffect(() => {
    errors.comment && toast.error(errors.comment?.message);
    errors.rating && toast.error(errors.rating?.message);
  }, [errors.comment, errors.rating]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input disabled={isDisabled} className="form__rating-input visually-hidden" defaultValue={5} id="5-stars" type="radio" {
          ...register('rating',
            {
              required: 'Rating is reqired field! Please rate from 1 to 5 stars.',
            },
          )}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input disabled={isDisabled} className="form__rating-input visually-hidden" defaultValue={4} id="4-stars" type="radio" {
          ...register('rating',
            {
              required: 'Rating is reqired field! Please rate from 1 to 5 stars.',
            },
          )}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input disabled={isDisabled} className="form__rating-input visually-hidden" defaultValue={3} id="3-stars" type="radio" {
          ...register('rating',
            {
              required: 'Rating is reqired field! Please rate from 1 to 5 stars.',
            },
          )}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input disabled={isDisabled} className="form__rating-input visually-hidden" defaultValue={2} id="2-stars" type="radio" {
          ...register('rating',
            {
              required: 'Rating is reqired field! Please rate from 1 to 5 stars.',
            },
          )}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input disabled={isDisabled} className="form__rating-input visually-hidden" defaultValue={1} id="1-star" type="radio" {
          ...register('rating',
            {
              required: 'Rating is reqired field! Please rate from 1 to 5 stars.',
            },
          )}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea disabled={isDisabled} className="reviews__textarea form__textarea" id="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''}
        {...register('comment',
          {
            required: 'Comment is reqired field! Please tell us about you experience there.',
            minLength: {
              value: 50,
              message: 'Please describe your stay with at least 50 characters.',
            },
            maxLength: {
              value: 300,
              message: 'Please describe your stay in no more 300 characters.',
            },
          },
        )}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isDirty || !isValid || isDisabled} >Submit</button>
      </div>
    </form>
  );
}
