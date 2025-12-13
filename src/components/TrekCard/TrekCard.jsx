import React from 'react';
import PropTypes from 'prop-types';
import './TrekCard.css';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * TrekCard Component
 * Displays individual trek information in a card format with image, details, and CTA button
 * Features hover effects, rating display, and key trek information
 */
const TrekCard = ({
  trek,
  id,
  name,
  region,
  difficulty,
  image,
  rating,
  reviewCount,
  cost,
  duration,
  description,
  onViewDetails
}) => {
  const data = trek || { id, name, region, difficulty, image, rating, reviewCount, cost, duration, description };
  const {
    id: trekId,
    name: trekName,
    region: trekRegion,
    difficulty: trekDifficulty,
    image: trekImage,
    rating: trekRating,
    reviewCount: trekReviewCount,
    cost: trekCost,
    duration: trekDuration,
    description: trekDescription
  } = data;
  // Truncate description to 100 characters
  const truncatedDescription = trekDescription && trekDescription.length > 120 
    ? trekDescription.substring(0, 120) + '...' 
    : trekDescription;

  // Format cost to currency
  const formattedCost = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(trekCost);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(trekId);
    }
  };

  const revealRef = useScrollReveal({ threshold: 0.15 });

  return (
    <div ref={revealRef} data-reveal className="trek-card">
      {/* Image Container */}
      <div className="trek-card__image-container">
        <img 
          src={trekImage} 
          alt={trekName} 
          className="trek-card__image"
          onError={(e) => {
            e.target.src = '/assets/images/placeholder.jpg';
          }}
        />
        {trekDifficulty && (
          <Badge 
            className="trek-card__difficulty-badge"
            variant={trekDifficulty.toLowerCase()}
          >
            {trekDifficulty}
          </Badge>
        )}
      </div>

      {/* Card Content */}
      <div className="trek-card__content">
        {/* Header */}
        <div className="trek-card__header">
          <h3 className="trek-card__title">{trekName}</h3>
          {trekRegion && (
            <p className="trek-card__region">{trekRegion}</p>
          )}
        </div>

        {/* Rating Section */}
        {trekRating !== undefined && (
          <div className="trek-card__rating">
            <span className="trek-card__star-rating">
              {'★'.repeat(Math.round(trekRating))}{'☆'.repeat(5 - Math.round(trekRating))}
            </span>
            <span className="trek-card__rating-value">
              {trekRating.toFixed(1)} ({trekReviewCount} reviews)
            </span>
          </div>
        )}

        {/* Description */}
        {trekDescription && (
          <p className="trek-card__description">
            {truncatedDescription}
          </p>
        )}

        {/* Details Row */}
        <div className="trek-card__details">
          {trekCost !== undefined && (
            <div className="trek-card__detail-item">
              <span className="trek-card__detail-label">Cost</span>
              <span className="trek-card__detail-value">{formattedCost}</span>
            </div>
          )}
          {trekDuration && (
            <div className="trek-card__detail-item">
              <span className="trek-card__detail-label">Duration</span>
              <span className="trek-card__detail-value">{trekDuration} days</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className="trek-card__cta-button"
          onClick={handleCardClick}
          variant="primary"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

TrekCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string,
  difficulty: PropTypes.oneOf(['Easy', 'Moderate', 'Hard', 'Expert']),
  image: PropTypes.string.isRequired,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  cost: PropTypes.number,
  duration: PropTypes.number,
  description: PropTypes.string,
  onViewDetails: PropTypes.func
};

TrekCard.defaultProps = {
  region: '',
  difficulty: 'Moderate',
  rating: 0,
  reviewCount: 0,
  cost: 0,
  duration: 0,
  description: '',
  onViewDetails: null
};

export default TrekCard;
