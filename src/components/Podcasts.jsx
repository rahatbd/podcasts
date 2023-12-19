import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h2`
    text-align: center;
    margin-block-end: 1rem;
`;

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(calc(400rem / 16), 100%), 1fr));
    gap: 0.5rem;
`;

const StyledCard = styled.article`
    line-height: 1.5;
    border: 1px solid ${({ theme }) => theme.darkTheme.borderColour};
    padding: 1rem;

    & > *:not(p) {
        text-align: center;
    }
`;

const StyledImageContainer = styled.div`
    /* display: grid;
    place-items: center; */
    margin-block: 1rem;
`;

/* eslint-disable react/prop-types */
function Podcasts({ param = 'best_podcasts', region = 'ca' }) {
    const [podcasts, setPodcasts] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);
    const [regionOptions, setRegionOptions] = useState({});
    const [selectedRegion, setSelectedRegion] = useState(region);

    function stripHtml(htmlString) {
        const string = new DOMParser().parseFromString(htmlString, 'text/html');
        return string.body.textContent || '';
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            try {
                const response = await fetch(
                    'https://listen-api-test.listennotes.com/api/v2/regions',
                    { signal }
                );
                if (!response.ok) throw `Status: ${response.status} ${response.statusText}`;
                const data = await response.json();
                // if (!data) throw 'No podcasts found!';
                const { regions } = data;
                let options = [];
                for (const region in regions) {
                    options.push({
                        code: region,
                        country: regions[region],
                    });
                }
                options.sort((a, b) => (a.country > b.country ? 1 : -1));
                setRegionOptions(regions);
                setSelectOptions(options);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error(error);
                    // render error UI
                }
            }
        })();

        return () => abortController.abort();
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            try {
                const response = await fetch(
                    `https://listen-api-test.listennotes.com/api/v2/${param}`,
                    { signal }
                );
                if (!response.ok) throw `Status: ${response.status} ${response.statusText}`;
                const data = await response.json();
                if (!data) throw 'No podcasts found!';
                setPodcasts(data.podcasts);
                // console.log(data);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error(error);
                    // render error UI
                }
            }
        })();

        return () => abortController.abort();
    }, [param]);

    return (
        <main>
            <StyledHeading>Best Podcasts - {regionOptions[selectedRegion]}</StyledHeading>
            {/* <form onSubmit={event => event.preventDefault()}> */}
            <form>
                <label htmlFor="region">Region</label>
                <select
                    id="region"
                    value={selectedRegion}
                    onChange={event => setSelectedRegion(event.target.value)}
                >
                    {selectOptions.map(({ code, country }) => (
                        <option
                            key={code}
                            value={code}
                        >
                            {country}
                        </option>
                    ))}
                </select>
            </form>
            <StyledContainer>
                {Boolean(podcasts.length) &&
                    podcasts.map(({ id, thumbnail, title, publisher, description }) => (
                        <StyledCard key={id}>
                            <h3>{title}</h3>
                            <h4>by {publisher}</h4>
                            <StyledImageContainer>
                                <img
                                    src={thumbnail}
                                    alt={`${title} cover art`}
                                    width="300"
                                    height="300"
                                    loading="lazy"
                                />
                            </StyledImageContainer>
                            <p>{stripHtml(description)}</p>
                        </StyledCard>
                    ))}
            </StyledContainer>
        </main>
    );
}

export default Podcasts;
