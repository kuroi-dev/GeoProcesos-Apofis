/**
 * Widget Registry - Sistema central de gestión de widgets personalizado
 * Inspirado en Experience Builder para manejar widgets de manera modular
 */

class WidgetRegistry {
  constructor() {
    this.widgets = new Map();
    this.categories = new Map();
  }

  /**
   * Registra un widget en el sistema
   * @param {Object} widgetConfig - Configuración del widget
   * @param {string} widgetConfig.id - ID único del widget
   * @param {string} widgetConfig.name - Nombre display del widget
   * @param {string} widgetConfig.category - Categoría del widget
   * @param {React.Component} widgetConfig.component - Componente React
   * @param {Object} widgetConfig.manifest - Manifiesto con metadatos
   */
  registerWidget(widgetConfig) {
    const { id, name, category, component, manifest } = widgetConfig;
    
    if (!id || !name || !component) {
      throw new Error('Widget debe tener id, name y component');
    }

    const widget = {
      id,
      name,
      category: category || 'general',
      component,
      manifest: manifest || {},
      registeredAt: new Date()
    };

    this.widgets.set(id, widget);

    // Organizar por categoría
    if (!this.categories.has(widget.category)) {
      this.categories.set(widget.category, []);
    }
    this.categories.get(widget.category).push(widget);

    console.log(`✅ Widget registrado: ${name} [${id}] en categoría ${widget.category}`);
  }

  /**
   * Obtiene un widget por ID
   */
  getWidget(id) {
    return this.widgets.get(id);
  }

  /**
   * Obtiene todos los widgets de una categoría
   */
  getWidgetsByCategory(category) {
    return this.categories.get(category) || [];
  }

  /**
   * Obtiene todos los widgets registrados
   */
  getAllWidgets() {
    return Array.from(this.widgets.values());
  }

  /**
   * Obtiene todas las categorías disponibles
   */
  getCategories() {
    return Array.from(this.categories.keys());
  }

  /**
   * Desregistra un widget
   */
  unregisterWidget(id) {
    const widget = this.widgets.get(id);
    if (widget) {
      // Remover de categoría
      const categoryWidgets = this.categories.get(widget.category);
      if (categoryWidgets) {
        const index = categoryWidgets.findIndex(w => w.id === id);
        if (index > -1) categoryWidgets.splice(index, 1);
      }
      
      this.widgets.delete(id);
      console.log(`❌ Widget desregistrado: ${widget.name} [${id}]`);
    }
  }

  /**
   * Buscar widgets por término
   */
  searchWidgets(searchTerm) {
    const term = searchTerm.toLowerCase();
    return this.getAllWidgets().filter(widget => 
      widget.name.toLowerCase().includes(term) ||
      widget.category.toLowerCase().includes(term) ||
      (widget.manifest.description && widget.manifest.description.toLowerCase().includes(term))
    );
  }
}

// Instancia global del registry
const widgetRegistry = new WidgetRegistry();

export default widgetRegistry;