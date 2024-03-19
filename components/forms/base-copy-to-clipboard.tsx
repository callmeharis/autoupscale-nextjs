import { InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Clipboard } from 'react-bootstrap-icons';
import BaseInput, { BaseInputProps } from './base-input';
import { toast } from 'react-toastify';

export interface BaseClickToCopyInputProps extends BaseInputProps {
	value: string
	tooltipText: string
}
export default function BaseClickToCopyInput({ tooltipText, value, className, label }: BaseClickToCopyInputProps) {
	const clickHandler = () => { navigator.clipboard.writeText(value) 
	toast.info('Copied')
	}
	return (
        
		<BaseInput
			append={<span className='m-auto absolute top-[9px]'><Clipboard onClick={clickHandler} /></span>}
			label={label}
			value={value}
			readOnly
			className={className}
		/>
	)
}
