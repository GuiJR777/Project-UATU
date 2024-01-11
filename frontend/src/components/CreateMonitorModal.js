import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import allB3Tickers from '../allB3Tickers';

const CreateMonitorModal = ({ show, onHide, onCreate }) => {
  const [newMonitor, setNewMonitor] = useState({
    codigo_acao: '',
    intervalo_atualizacao: 1,
    alerta_compra: 1.0,
    alerta_venda: 100.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMonitor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    onCreate(newMonitor);

    setNewMonitor({
      codigo_acao: '',
      intervalo_atualizacao: 1,
      alerta_compra: 0.0,
      alerta_venda: 0.0,
    });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Monitor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Adicione os campos do formulário aqui conforme necessário */}
          <Form.Group controlId="formCodigoAcao">
                <Form.Label>Código da Ação</Form.Label>
                <Form.Control as="select" name="codigo_acao" value={newMonitor.codigo_acao} onChange={handleChange}>
                  {allB3Tickers.map((ticker) => (
                    <option key={ticker} value={ticker}>
                      {ticker}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

          <Form.Group controlId="formIntervaloAtualizacao">
            <Form.Label>Intervalo de Atualização</Form.Label>
            <Form.Control
              as="select"
              name="intervalo_atualizacao"
              value={newMonitor.intervalo_atualizacao}
              onChange={handleChange}
            >
              {[1, 2, 3, 5, 10, 15, 30, 60].map((minutes) => (
                <option key={minutes} value={minutes}>
                  {`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAlertaCompra">
                <Form.Label>Alerta de Compra</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_compra"
                  value={newMonitor.alerta_compra}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAlertaVenda">
                <Form.Label>Alerta de Venda</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_venda"
                  value={newMonitor.alerta_venda}
                  onChange={handleChange}
                />
              </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Criar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMonitorModal;