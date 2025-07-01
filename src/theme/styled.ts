import styled, { css } from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const GlassCard = styled.div`
  background: ${({ theme }) => theme.components.card.background};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 247, 255, 0.2);
`;

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background: rgba(25, 25, 45, 0.7);
          color: #fff;
          border: 1px solid rgba(0, 247, 255, 0.3);
          
          &:hover:not(:disabled) {
            background: rgba(35, 35, 55, 0.8);
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
        `;
      case 'success':
        return css`
          background: #28a745;
          color: white;
          
          &:hover:not(:disabled) {
            background: #218838;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
        `;
      case 'danger':
        return css`
          background: #dc3545;
          color: white;
          
          &:hover:not(:disabled) {
            background: #c82333;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
        `;
      case 'warning':
        return css`
          background: #ffc107;
          color: #212529;
          
          &:hover:not(:disabled) {
            background: #e0a800;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
        `;
      case 'primary':
      default:
        return css`
          background: #00f7ff;
          color: #0a1929;
          
          &:hover:not(:disabled) {
            background: #00d4e0;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

export const Input = styled.input`
  background: rgba(25, 25, 45, 0.5);
  border: 1px solid rgba(0, 247, 255, 0.3);
  border-radius: 6px;
  color: #e0e0e0;
  padding: 12px 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  width: 100%;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00f7ff;
    box-shadow: 0 0 0 2px rgba(0, 247, 255, 0.2);
  }
  
  &::placeholder {
    color: #6c6c6c;
  }
`;

export const TextArea = styled.textarea`
  background: rgba(25, 25, 45, 0.5);
  border: 1px solid rgba(0, 247, 255, 0.3);
  border-radius: 6px;
  color: #e0e0e0;
  padding: 12px 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  width: 100%;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00f7ff;
    box-shadow: 0 0 0 2px rgba(0, 247, 255, 0.2);
  }
  
  &::placeholder {
    color: #6c6c6c;
  }
`;

export const Select = styled.select`
  background: rgba(25, 25, 45, 0.5);
  border: 1px solid rgba(0, 247, 255, 0.3);
  border-radius: 6px;
  color: #e0e0e0;
  padding: 12px 16px;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  width: 100%;
  transition: all 0.3s ease;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300f7ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    border-color: #00f7ff;
    box-shadow: 0 0 0 2px rgba(0, 247, 255, 0.2);
  }
  
  option {
    background: #0a0a1a;
    color: #e0e0e0;
    padding: 8px;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.colorPalette.text.primary};
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const NeonText = styled.span`
  color: #00f7ff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.8), 0 0 20px rgba(0, 247, 255, 0.6);
  animation: flicker 1.5s infinite alternate;
`;
