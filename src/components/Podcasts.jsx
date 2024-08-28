import Flag from 'react-world-flags';
import styled from 'styled-components';

const StyledPodcastsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
    gap: var(--gap);
`;

const StyledArticle = styled.article`
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
    place-items: center;
    line-height: 1.5;
    break-inside: avoid;
    padding: 1rem;
`;

const StyledHeadingsDiv = styled.div`
    text-align: center;
    text-wrap: balance;
`;

const StyledH2 = styled.h2`
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: calc(1rem / 16);
`;

const StyledH3 = styled.h3`
    font-size: 1rem;
    font-weight: 500;
`;

const StyledSpan = styled.span`
    font-style: italic;
    font-weight: 200;
    font-variation-settings: 'opsz' 32;
`;

const StyledPodcastImg = styled.img`
    inline-size: calc(250rem / 16);
    aspect-ratio: 1;
`;

const StyledDescriptionP = styled.p`
    max-inline-size: 70ch;
    overflow-wrap: anywhere;

    @media screen {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
`;

const StyledCountryP = styled.p`
    justify-self: stretch;
    text-align: center;
    font-weight: 300;
    border-block-start: var(--border-inline-size) solid light-dark(var(--light-colour-accent), var(--dark-colour-accent));
    padding-block-start: 0.5rem;
    margin-block-start: -0.5rem;
`;

const StyledFlagImg = styled(Flag)`
    inline-size: 2rem;
    aspect-ratio: 2;
    margin-inline-start: 0.25rem;
`;

function Podcasts({ regions, bestPodcasts }) {
    function stripHtml(htmlString) {
        const string = new DOMParser().parseFromString(htmlString, 'text/html');
        return string.body.textContent || '';
    }

    function findRegion(country) {
        const { region } = regions.find(({ name }) => name === country);
        return region;
    }

    return (
        <StyledPodcastsDiv>
            {bestPodcasts.podcasts.map(({ id, title, publisher, thumbnail, description, country }) => (
                <StyledArticle
                    className="border"
                    key={id}
                >
                    <StyledHeadingsDiv>
                        <StyledH2>{title}</StyledH2>
                        <StyledH3>
                            <StyledSpan>by</StyledSpan> {publisher}
                        </StyledH3>
                    </StyledHeadingsDiv>
                    <StyledPodcastImg
                        alt={`"${title}" podcast artwork`}
                        src={thumbnail}
                        width={250}
                        height={250}
                        loading="lazy"
                    />
                    <StyledDescriptionP>{stripHtml(description)}</StyledDescriptionP>
                    <StyledCountryP>
                        Country: {country || 'not available'}
                        {country && (
                            <StyledFlagImg
                                alt={`${country} flag`}
                                code={findRegion(country)}
                                width={32}
                                height={16}
                                loading="lazy"
                            />
                        )}
                    </StyledCountryP>
                </StyledArticle>
            ))}
        </StyledPodcastsDiv>
    );
}

export default Podcasts;
