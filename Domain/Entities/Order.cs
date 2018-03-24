using Domain.Entities;
using Domain.Enums;
using FluentValidator;
using Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class Order : Entity
    {
        private readonly IList<OrderItem> _items;

        public Order(Customer customer)
        {
            Customer = customer;
            CreateDate = DateTime.Now;
            Status = EOrderStatus.Created;
            _items = new List<OrderItem>();
        }

        public Customer Customer { get; private set; }
        public string Number { get; private set; }
        public DateTime CreateDate { get; private set; }
        public EOrderStatus Status { get; private set; }
        public IReadOnlyCollection<OrderItem> Items => _items.ToArray();

        public void AddItem(Product product, decimal quantity)
        {
            if(quantity > product.QuantityOnHand)
                AddNotification("OrderItem", $"Produto {product.Title} não tem {quantity} itens em estoque.");
            
            var item = new OrderItem(product, quantity);
            _items.Add(item);            
        }

        // Criar um pedido
        public void Place()
        {
            // Gera o n�mero do pedido
            Number = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 8).ToUpper();
            if (_items.Count == 0)
                AddNotification("Order", "Este pedido não possui itens");
        }

        // Pagar um pedido
        public void Pay()
        {
            Status = EOrderStatus.Paid;
        }



        // Cancelar um pedido
        public void Cancel()
        {
            Status = EOrderStatus.Canceled;
           // _deliveries.ToList().ForEach(x => x.Cancel());
        }
    }
}