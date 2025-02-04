import { cc } from '../utilities/helpers';

export function LineClearText({ animationInfo, setAnimationInfo }) {
  return (
    <div
      className={cc('text', animationInfo.text && 'animate')}
      onAnimationEnd={() =>
        setAnimationInfo((prevInfo) => ({ ...prevInfo, text: '' }))
      }
    >
      {animationInfo.text}
    </div>
  );
}
