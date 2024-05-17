import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

const ModalComponent = ({
  details,
  onClose,
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
}) => {
  // Use the same `typeClass` logic as in your Card component, if applicable
  const typeClass = details.type ? details.type.toLowerCase() : '';
  const displayText = details.longText || details.text;

  // Helper function to create URL-friendly names
  function formatTitleForUrl(title) {
    return title
      .replace(/[^\w\s]/gi, '') // Remove all non-word characters except spaces
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase(); // Convert to lowercase to standardize
  }

  // Use the formatted title for URL
  const formattedTitle = formatTitleForUrl(details.title);
  const shareUrl = `${window.location.origin}${window.location.pathname}#card=${formattedTitle}`;

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank');
    setShareSuccess(true);
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank');
    setShareSuccess(true);
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent('Check this out');
    const body = encodeURIComponent(`Thought you might like this: ${shareUrl}`);
    const mailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailUrl;
    setShareSuccess(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareSuccess(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOptions = () => {
    if (shareSuccess) {
      return (
        <div className={styles.shareButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
          </svg>
        </div>
      );
    }

    if (showShareOptions) {
      return (
        <div className={styles.shareButton}>
          <div onClick={shareToTwitter}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </div>
          <div onClick={shareToFacebook}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </div>
          <div onClick={shareToEmail}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
            </svg>
          </div>
          <div onClick={copyLink}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <button
        className={styles.shareButton}
        onClick={() => setShowShareOptions(true)}
      >
        Share
      </button>
    );
  };

  return (
    <div className={styles.modals} onClick={onClose}>
      <div
        className={`${styles.modalContents} ${styles[typeClass] || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.cardHeader}>
          <span className={styles.cardType}>{details.category}</span>
        </div>
        <div className={styles.cardContents}>
          {details.photo && (
            <img
              src={'/img/site/' + details.photo}
              alt={details.title}
              className={styles.cardImage}
            />
          )}
          <h3 className={styles.cardTitle}>{details.title}</h3>{' '}
          <span className={styles.modalText}>{displayText}</span>
          <div>{shareOptions()}</div>
          <div className={styles.bottomCard}>
            {/* {details.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))} */}

            {/* related content */}
            {(details.bloglink || details.doclink || details.videolink) && (
              <>
                <p className={styles.relatedText}>Related Content:</p>
                <div className={styles.relatedBox}>
                  {details.bloglink && (
                    <Link to={details.bloglink}>
                      <div className={styles.relatedBlog}>
                        <div className={styles.relatedImage}></div>
                        <div className={styles.relatedBottom}>
                          <span className={styles.relatedTitle}>Blog:</span>
                          <span className={styles.relatedSubtitle}>
                            Combining LangChain and Weaviate
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                  {details.doclink && (
                    <Link to={details.doclink}>
                      <div className={styles.relatedBlog}>
                        <div className={styles.relatedImage}></div>
                        <div className={styles.relatedBottom}>
                          <span className={styles.relatedTitle}>Doc:</span>
                          <span className={styles.relatedSubtitle}>
                            Documentation
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                  {details.videolink && (
                    <Link to={details.videolink}>
                      <div className={styles.relatedBlog}>
                        <div className={styles.relatedImage}></div>
                        <div className={styles.relatedBottom}>
                          <span className={styles.relatedTitle}>Video:</span>
                          <span className={styles.relatedSubtitle}>Video</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
          <span
            className={styles.nextText}
          >{`${currentIndex} of ${totalCards}`}</span>
          <div className={styles.nextContainer}>
            <div className={styles.nextButton} onClick={onPrevious}>
              Previous
            </div>
            <div className={styles.nextButton} onClick={onNext}>
              Next
            </div>
          </div>
          {/*  {details.link && (
            <Link to={details.link} className={styles.cardLink}>
              Read more on site
            </Link>
          )}
           <div className={styles.closeButtonContainer}>
          <Link onClick={onClose} className={styles.close}>
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
