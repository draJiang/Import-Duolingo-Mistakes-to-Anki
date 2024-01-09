import styled, { css } from 'styled-components';

export const Button = styled.button<{ type?: 'primary' | 'second' | 'link' }>`

  width:${props => props.type === 'link' ? 'auto' : '300px'};
  height:${props => props.type === 'link' ? 'auto' : '48px'};
  
  flex-shrink: 0;
  border-radius: 16px;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.8px;
  text-transform: uppercase;

  &:active {
    transform: translateY(3px);
    box-shadow: none;
  }

  ${props => props.type === 'primary' && css`
    color: white;
    border: 0;
    background: #1CB0F6;
    box-shadow: 0px 4px 0px 0px #1899D6;
  `}

  ${props => props.type === 'second' && css`
    color: #1899D6;
    border: 2px solid #E5E5E5;
    background: #FFF;
    box-shadow: 0px 2px 0px 0px #E5E5E5;
  `}

  ${props => props.type === 'link' && css`
    text-decoration: none;
    color: #1CB0F6;
    background: transparent;
    border: none;
    box-shadow: none;
  `}

  ${props => props.style}
  
`;

export const Divider = styled.hr`

  width:100%;
  margin:20px,0;
  ${props => props.style}

`



