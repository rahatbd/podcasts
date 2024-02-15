import { useState, useEffect } from 'react';
import { flexCentre } from '../GlobalStyle';
import useStickyState from '../hooks/useStickyState';
import useFetch from '../hooks/useFetch';
import Podcasts from './Podcasts';
import styled from 'styled-components';

const StyledForm = styled.form`
    ${flexCentre}
    /* display: flex; */
    align-items: baseline;
    /* justify-content: center;
    flex-wrap: wrap;
    gap: var(--space);
    text-align: center; */
    margin-block-end: var(--space);
`;

const StyledLabel = styled.label`
    font-size: 1.5rem;
    font-weight: 550;
    text-shadow: 0 0 calc(1rem / 16);
`;

const StyledArrowDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    &::after {
        --border-inline-size: calc(7rem / 16);
        content: '';
        position: absolute;
        inset-inline-end: 5%;
        border-block-start: var(--border-inline-size) solid;
        border-inline: var(--border-inline-size) solid transparent;
        pointer-events: none;
    }
`;

const StyledSelect = styled.select`
    --inline-size: 250px;
    appearance: none;
    background-color: ${({ theme }) => theme.accentColour};
    border: none;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 1.25rem;
    font-weight: 800;
    min-inline-size: var(--inline-size);
    inline-size: max(var(--inline-size), 100%);
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:focus {
        outline: calc(1rem / 16) solid;
        filter: drop-shadow(0 0 calc(1rem / 16));
    }
`;

function Regions() {
    const [options, setOptions] = useState([]);
    // const [region, setRegion] = useState('ca');
    const [region, setRegion] = useStickyState('ca', 'country');
    const getRegions = useFetch('regions');

    useEffect(() => {
        if (!getRegions) return;
        const { regions } = getRegions;
        let options = [];
        for (const region in regions) {
            options.push({
                name: regions[region],
                region,
            });
        }
        options.sort((a, b) => (a.name > b.name ? 1 : -1));
        setOptions(options);
    }, [getRegions]);

    return (
        <main className="wrapper">
            <StyledForm>
                <StyledLabel htmlFor="region">Top Podcasts:</StyledLabel>
                <StyledArrowDiv>
                    <StyledSelect
                        id="region"
                        value={region}
                        onChange={event => setRegion(event.target.value)}
                        autoComplete="on"
                    >
                        {options.map(({ name, region }) => (
                            <option
                                key={region}
                                value={region}
                            >
                                {name}
                            </option>
                        ))}
                    </StyledSelect>
                </StyledArrowDiv>
            </StyledForm>
            {/* <p>
                Please note that podcasts that are &quot;best&quot; in a country/region may not be
                produced in that country/region.
            </p> */}
            <Podcasts
                options={options}
                region={region}
            />
        </main>
    );
}

export default Regions;
