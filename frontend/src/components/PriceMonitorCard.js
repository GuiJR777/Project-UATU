import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMonitoring, editMonitoring } from '../actions/monitoringActions';
import MonitorEditor from '../components/MonitorEditor';

import './price-monitor-card.css'

const PriceMonitorCard = (props) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const monitoringEdit = useSelector((state) => state.monitoringEdit);

  const handleDelete = async () => {
    await dispatch(deleteMonitoring(props.id));

    if (props.onMonitorDelete) {
      props.onMonitorDelete();
    }

    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSave = (editedData) => {
    if (!monitoringEdit.editing) {
      dispatch(editMonitoring(props.id, editedData));
    }
    setShowEditModal(false);
    props.onMonitorEdit();
  };

  const upOrDown = () => {
    if (props.preco_anterior <= props.preco_atual) {
      return "fa-solid fa-caret-up"
    }else{
      return "fa-solid fa-caret-down"
    }
  }

  return (
    <div className={`price-monitor-card-container ${props.id} `}>
      <li className="price-monitor-card-li list-item">
        <div className="price-monitor-card-container1">
          <span className="price-monitor-card-company-ticker">
            {props.codigo_acao}
          </span>
          <span className="price-monitor-card-actual-price">R$ {props.preco_atual}</span>
          <i className={upOrDown()} id='UpOrDown'></i>
          <div className='price-monitor-limits'>
            <span>Buy {props.alerta_compra}</span>
            <br />
            <span>Sale {props.alerta_venda}</span>
          </div>
          <div className='actions-buttons'>
            <button type="button" className="price-monitor-card-delete button" onClick={() => setShowDeleteModal(true)}>
              <i class="fa-solid fa-trash"></i>
            </button>
            <button type="button" className="price-monitor-card-edit button" onClick={handleEdit}>
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </li>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este ativo da lista?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <MonitorEditor
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSave={handleEditSave}
        monitoring={props}
      />
    </div>
  )
}

PriceMonitorCard.defaultProps = {
  codigo_acao: 'MGLU3',
  preco_atual: '2.14',
  preco_anterior: '2.09',
  id: '',
  alerta_compra: '2.00',
  alerta_venda: '2.20',
}

PriceMonitorCard.propTypes = {
  codigo_acao: PropTypes.string,
  preco_atual: PropTypes.string,
  id: PropTypes.string,
  onMonitorDelete: PropTypes.func,
}

export default PriceMonitorCard
