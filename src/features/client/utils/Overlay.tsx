import type { ReactNode } from 'react';
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface OverlayProps {
    children?: ReactNode;
    isOpen?: boolean;
    toggle?: () => void;
    title?: string;
}

export default function OverlayComponent(props: OverlayProps) {
  const { children, isOpen, toggle, title } = props;
    return (
        <Modal id="fancybox" isOpen={isOpen} toggle={toggle} keyboard={false}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody style={{
                maxHeight: 'calc(100vh - 210px)',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                {children && React.Children.map(children, (child, index) => (
                    <div key={index} className="w-100">
                        {child}
                    </div>
                ))}
            </ModalBody>
        </Modal>
    );
}