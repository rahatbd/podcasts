import Flag from 'react-world-flags';
import styled from 'styled-components';

const StyledPodcastsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
    gap: var(--gap);
`;

const StyledArticle = styled.article`
    contain: content;
    line-height: 1.5;
    padding-inline: 1rem;

    > div {
        border-block-end: var(--border-inline-size) solid ${({ theme }) => theme.accentColour};
    }
`;

const StyledCentreDiv = styled.div`
    /* https://caniuse.com/mdn-css_properties_align-content_block_context */
    align-content: center;
    min-block-size: calc(125rem / 16);
`;

const StyledHeadingsDiv = styled(StyledCentreDiv)`
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

const StyledImageDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledPodcastImg = styled.img`
    inline-size: calc(300rem / 16);
    aspect-ratio: 1;
`;

const StyledDescriptionP = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    max-inline-size: 70ch;
`;

const StyledCountryP = styled.p`
    font-weight: 300;
    text-align: center;
    padding-block: 0.5em;
`;

const StyledFlagImg = styled(Flag)`
    inline-size: 1.25lh;
`;

function Podcasts({ options, bestPodcasts }) {
    function stripHtml(htmlString) {
        const string = new DOMParser().parseFromString(htmlString, 'text/html');
        return string.body.textContent || '';
    }

    function findRegion(country) {
        const { region } = options.find(({ name }) => name === country);
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
                    <StyledImageDiv>
                        <StyledPodcastImg
                            alt={`"${title}" podcast artwork`}
                            src={thumbnail}
                            width={300}
                            height={300}
                            loading="lazy"
                        />
                    </StyledImageDiv>
                    <StyledCentreDiv>
                        <StyledDescriptionP>{stripHtml(description)}</StyledDescriptionP>
                    </StyledCentreDiv>
                    <StyledCountryP>
                        Country: {country}{' '}
                        <StyledFlagImg
                            alt={`${country} flag`}
                            code={findRegion(country)}
                            width={24}
                        />
                    </StyledCountryP>
                </StyledArticle>
            ))}
        </StyledPodcastsDiv>
    );
}

export default Podcasts;
