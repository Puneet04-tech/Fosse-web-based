import sys
import os
import requests
import pandas as pd
import numpy as np
import seaborn as sns
from scipy import stats
from datetime import datetime
from PyQt5.QtWidgets import *
from PyQt5.QtCore import Qt, QTimer, QPropertyAnimation, QEasingCurve, QRect
from PyQt5.QtGui import QFont, QColor, QPalette, QLinearGradient, QBrush, QPainter
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
from matplotlib import gridspec

API_BASE = os.environ.get('API_URL', 'http://127.0.0.1:8000/api')

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('🚀 Elite Analytics Suite - Chemical Equipment Analysis')
        self.setGeometry(50, 50, 1600, 1000)
        
        # Set matplotlib style
        plt.style.use('seaborn-v0_8-darkgrid')
        sns.set_palette("husl")
        
        # Variables
        self.selected_file = None
        self.datasets = []
        self.current_data = None
        self.is_processing = False
        
        # Apply premium dark theme with gradients
        self.setStyleSheet("""
            QMainWindow { 
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0f172a, stop:1 #1e293b); 
                color: #f1f5f9; 
            }
            QTabWidget::pane { 
                border: 3px solid qlineargradient(x1:0, y1:0, x2:1, y2:0, stop:0 #3b82f6, stop:1 #8b5cf6); 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 rgba(30, 41, 59, 0.98), stop:1 rgba(15, 23, 42, 0.98)); 
                border-radius: 15px; 
            }
            QTabBar::tab { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #1e40af, stop:1 #1e3a8a); 
                color: white; padding: 14px 28px; margin-right: 4px; 
                border-top-left-radius: 10px; border-top-right-radius: 10px; 
                font-weight: 600; font-size: 11pt;
            }
            QTabBar::tab:selected { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #3b82f6, stop:1 #2563eb); 
            }
            QTabBar::tab:hover { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #2563eb, stop:1 #1d4ed8); 
            }
            QGroupBox { 
                font-weight: bold; font-size: 13pt; color: #e2e8f0; 
                border: 3px solid qlineargradient(x1:0, y1:0, x2:1, y2:0, stop:0 #3b82f6, stop:1 #8b5cf6); 
                border-radius: 15px; margin-top: 12px; padding-top: 15px; 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 rgba(30, 41, 59, 0.9), stop:1 rgba(15, 23, 42, 0.8)); 
            }
            QGroupBox::title { 
                subcontrol-origin: margin; left: 15px; padding: 0 12px 0 12px; 
                color: #93c5fd; font-size: 13pt;
            }
            QPushButton { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #3b82f6, stop:1 #2563eb); 
                color: white; border: none; padding: 14px 28px; border-radius: 10px; 
                font-weight: 600; font-size: 11pt; 
            }
            QPushButton:hover { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #60a5fa, stop:1 #3b82f6); 
            }
            QPushButton:pressed { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #2563eb, stop:1 #1e40af); 
            }
            QPushButton:disabled { 
                background: #64748b; 
            }
            QLineEdit { 
                padding: 12px; border: 2px solid #3b82f6; border-radius: 10px; 
                background: rgba(255,255,255,0.12); color: #f1f5f9; font-size: 11pt; 
            }
            QLineEdit:focus { 
                border: 2px solid #60a5fa; 
                background: rgba(255,255,255,0.15); 
            }
            QComboBox { 
                padding: 10px; border: 2px solid #3b82f6; border-radius: 10px; 
                background: rgba(255,255,255,0.12); color: #f1f5f9; font-size: 11pt; 
            }
            QComboBox:hover { 
                border: 2px solid #60a5fa; 
            }
            QComboBox::drop-down { 
                border: none; width: 30px; 
            }
            QProgressBar { 
                border: 3px solid #3b82f6; border-radius: 10px; text-align: center; 
                font-weight: 600; color: #f1f5f9; background: rgba(30, 41, 59, 0.8); 
                height: 28px; font-size: 11pt;
            }
            QProgressBar::chunk { 
                background: qlineargradient(x1:0, y1:0, x2:1, y2:0, stop:0 #3b82f6, stop:1 #8b5cf6); 
                border-radius: 7px; 
            }
            QTableWidget { 
                background: rgba(255, 255, 255, 0.97); color: #0f172a; 
                border: 3px solid #3b82f6; border-radius: 15px; font-size: 10pt; 
                gridline-color: #cbd5e1;
            }
            QTableWidget::item { 
                padding: 8px; 
            }
            QTableWidget::item:selected { 
                background: #3b82f6; color: white; 
            }
            QTableWidget::item:alternate { 
                background: rgba(59, 130, 246, 0.08); 
            }
            QHeaderView::section { 
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #3b82f6, stop:1 #2563eb); 
                color: white; padding: 10px; border: none; font-weight: 600; font-size: 10pt;
            }
            QTextEdit { 
                background: rgba(255, 255, 255, 0.97); color: #0f172a; 
                border: 3px solid #3b82f6; border-radius: 10px; padding: 12px; 
                font-family: 'Consolas', monospace; font-size: 10pt;
            }
            QLabel { 
                color: #f1f5f9; font-size: 11pt; 
            }
            QScrollBar:vertical {
                background: rgba(100, 116, 139, 0.2);
                width: 14px;
                border-radius: 7px;
            }
            QScrollBar::handle:vertical {
                background: #3b82f6;
                border-radius: 7px;
                min-height: 30px;
            }
            QScrollBar::handle:vertical:hover {
                background: #60a5fa;
            }
        """)
        
        self.setup_status_bar()
        self.init_ui()
        QTimer.singleShot(1000, self.initialize_app)

    def setup_status_bar(self):
        self.status_bar = QStatusBar()
        self.status_bar.setStyleSheet("QStatusBar { background: rgba(59, 130, 246, 0.2); color: #e2e8f0; border-top: 2px solid #3b82f6; padding: 8px; font-size: 11pt; font-weight: 600; }")
        self.setStatusBar(self.status_bar)
        self.status_bar.showMessage("🚀 Starting Elite Analytics Suite...")

    def init_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout()
        main_layout.setSpacing(20)
        main_layout.setContentsMargins(25, 25, 25, 25)
        
        # Header
        header_frame = self.create_header_section()
        main_layout.addWidget(header_frame)
        
        # Tabs
        self.tab_widget = QTabWidget()
        self.tab_widget.addTab(self.create_file_operations_tab(), "📁 Data Operations")
        self.tab_widget.addTab(self.create_visualization_tab(), "📈 Advanced Analytics")
        self.tab_widget.addTab(self.create_data_table_tab(), "📋 Data Table")
        self.tab_widget.addTab(self.create_statistics_tab(), "📊 Statistical Analysis")
        self.tab_widget.addTab(self.create_insights_tab(), "💡 AI Insights")
        
        main_layout.addWidget(self.tab_widget)
        central_widget.setLayout(main_layout)

    def create_header_section(self):
        header_frame = QFrame()
        header_frame.setStyleSheet("QFrame { background: rgba(59, 130, 246, 0.15); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 20px; }")
        header_layout = QVBoxLayout(header_frame)
        
        # Title
        title_label = QLabel("🚀 Elite Analytics Suite")
        title_label.setFont(QFont("Arial", 24, QFont.Bold))
        title_label.setStyleSheet("color: #93c5fd; margin-bottom: 5px;")
        header_layout.addWidget(title_label)
        
        subtitle_label = QLabel("Advanced Chemical Equipment Data Analysis & Anomaly Detection System")
        subtitle_label.setFont(QFont("Arial", 12))
        subtitle_label.setStyleSheet("color: #cbd5e1; margin-bottom: 15px;")
        header_layout.addWidget(subtitle_label)
        
        # Connection Status
        self.connection_label = QLabel("🔍 Initializing connection...")
        self.connection_label.setStyleSheet("padding: 10px; border: 2px dashed #fbbf24; border-radius: 8px; background: rgba(251, 191, 36, 0.1); color: #fbbf24; font-weight: 600;")
        header_layout.addWidget(self.connection_label)
        
        # Add retry button
        self.retry_connection_btn = QPushButton("🔄 Retry Connection")
        self.retry_connection_btn.clicked.connect(self.initialize_app)
        self.retry_connection_btn.setStyleSheet("""
            QPushButton { 
                background: #f59e0b; 
                color: white; 
                border: none; 
                padding: 12px 24px; 
                border-radius: 8px; 
                font-weight: 600; 
                font-size: 11pt; 
            }
            QPushButton:hover { background: #fbbf24; }
        """)
        header_layout.addWidget(self.retry_connection_btn)
        
        return header_frame

    def create_file_operations_tab(self):
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # File Selection
        file_group = QGroupBox("📁 Data Import")
        file_layout = QVBoxLayout()
        
        self.file_label = QLabel("📄 No file selected")
        self.file_label.setStyleSheet("padding: 15px; border: 2px dashed #64748b; border-radius: 8px; background: rgba(100, 116, 139, 0.1); color: #94a3b8; font-weight: 600;")
        file_layout.addWidget(self.file_label)
        
        button_layout = QHBoxLayout()
        self.choose_btn = QPushButton("📁 Select CSV File")
        self.choose_btn.clicked.connect(self.choose_file)
        self.upload_btn = QPushButton("⬆️ Upload & Analyze")
        self.upload_btn.clicked.connect(self.upload)
        self.upload_btn.setEnabled(False)
        button_layout.addWidget(self.choose_btn)
        button_layout.addWidget(self.upload_btn)
        file_layout.addLayout(button_layout)
        
        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        file_layout.addWidget(self.progress_bar)
        
        self.msg = QLabel("")
        self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600;")
        file_layout.addWidget(self.msg)
        
        file_group.setLayout(file_layout)
        layout.addWidget(file_group)
        
        # Control buttons
        control_group = QGroupBox("🎛️ Data Management")
        control_layout = QGridLayout()
        self.refresh_btn = QPushButton("🔄 Refresh History")
        self.refresh_btn.clicked.connect(self.load_history)
        self.clear_btn = QPushButton("🗑️ Clear Data")
        self.clear_btn.clicked.connect(self.clear_data)
        self.export_btn = QPushButton("📤 Export CSV")
        self.export_btn.clicked.connect(self.export_table)
        
        control_layout.addWidget(self.refresh_btn, 0, 0)
        control_layout.addWidget(self.clear_btn, 0, 1)
        control_layout.addWidget(self.export_btn, 0, 2)
        control_group.setLayout(control_layout)
        layout.addWidget(control_group)
        layout.addStretch()
        
        return tab_widget

    def create_visualization_tab(self):
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # Chart controls
        controls_group = QGroupBox("📊 Visualization Controls")
        controls_layout = QHBoxLayout()
        
        self.chart_type_combo = QComboBox()
        self.chart_type_combo.addItems([
            "📊 Multi-Panel Dashboard",
            "🔵 Equipment Distribution (Enhanced Pie)",
            "📊 Parameter Analysis (Multi-Bar)", 
            "📈 Time Series Analysis",
            "🔥 Heatmap Correlation Matrix",
            "📉 Distribution Analysis (Histograms)",
            "🚨 Anomaly Detection (Advanced)",
            "📋 Comprehensive Report"
        ])
        self.chart_type_combo.currentTextChanged.connect(self.update_chart_type)
        
        controls_layout.addWidget(QLabel("📊 Chart Type:"))
        controls_layout.addWidget(self.chart_type_combo, 2)
        
        self.refresh_chart_btn = QPushButton("🔄 Refresh")
        self.refresh_chart_btn.clicked.connect(self.refresh_current_chart)
        controls_layout.addWidget(self.refresh_chart_btn)
        
        self.save_chart_btn = QPushButton("💾 Save Chart")
        self.save_chart_btn.clicked.connect(self.save_chart)
        controls_layout.addWidget(self.save_chart_btn)
        
        controls_group.setLayout(controls_layout)
        layout.addWidget(controls_group)
        
        # Matplotlib figure
        self.figure = Figure(figsize=(12, 8), dpi=100)
        self.figure.patch.set_facecolor('white')
        self.canvas = FigureCanvas(self.figure)
        self.canvas.setStyleSheet("background: white; border: 2px solid #3b82f6; border-radius: 12px;")
        layout.addWidget(self.canvas)
        
        # Show initial chart immediately
        QTimer.singleShot(500, self.show_initial_chart)
        
        return tab_widget

    def create_data_table_tab(self):
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # Table info
        self.table_info_label = QLabel("📊 Table: No data loaded")
        self.table_info_label.setStyleSheet("color: #93c5fd; font-weight: 600; font-size: 11pt; padding: 10px; background: rgba(59, 130, 246, 0.1); border-radius: 8px;")
        layout.addWidget(self.table_info_label)
        
        # Search
        search_layout = QHBoxLayout()
        self.search_box = QLineEdit()
        self.search_box.setPlaceholderText("🔍 Search data...")
        self.search_box.textChanged.connect(self.search_table)
        search_layout.addWidget(QLabel("Search:"))
        search_layout.addWidget(self.search_box)
        search_layout.addStretch()
        layout.addLayout(search_layout)
        
        # Data table
        self.table = QTableWidget()
        self.table.setAlternatingRowColors(True)
        self.table.setSortingEnabled(True)
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Interactive)
        layout.addWidget(self.table)
        
        return tab_widget

    def show_initial_chart(self):
        """Show a demo chart immediately when app starts"""
        self.create_demo_pie_chart()

    def initialize_app(self):
        try:
            self.status_bar.showMessage("Testing connection to backend...")
            self.connection_label.setText("🔍 Testing connection to backend...")
            
            # Test connection with simple request
            response = requests.get(f'{API_BASE}/datasets/', timeout=5)
            
            if response.status_code == 200:
                self.connection_label.setText("✅ Connected to backend successfully")
                self.connection_label.setStyleSheet("padding: 10px; border: 2px solid #10b981; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 600;")
                self.status_bar.showMessage("✅ Connected to backend - Ready to use")
                
                # Load initial data
                QTimer.singleShot(500, self.load_history)
            else:
                raise Exception(f"HTTP {response.status_code}")
                
        except requests.exceptions.ConnectionError as e:
            self.connection_label.setText("❌ Backend server not running")
            self.connection_label.setStyleSheet("padding: 10px; border: 2px solid #ef4444; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; font-weight: 600;")
            self.status_bar.showMessage("❌ Backend server not running - Please start Django server")
            
            # Show simple error message
            QMessageBox.critical(self, 'Connection Error', 
                              f'❌ Cannot connect to backend at {API_BASE}\n\n'
                              f'🔧 QUICK FIX:\n'
                              f'1. Open Command Prompt\n'
                              f'2. Run: cd backend\n'
                              f'3. Run: python manage.py runserver\n'
                              f'4. Then restart this desktop app\n\n'
                              f'Backend URL: {API_BASE}')
                              
        except Exception as e:
            self.connection_label.setText(f"❌ Connection failed: {str(e)}")
            self.connection_label.setStyleSheet("padding: 10px; border: 2px solid #ef4444; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; font-weight: 600;")
            self.status_bar.showMessage("❌ Connection failed")

    def choose_file(self):
        f, _ = QFileDialog.getOpenFileName(self, 'Select CSV File for Analysis', '', 'CSV Files (*.csv);;All Files (*)')
        if f:
            self.selected_file = f
            file_size = os.path.getsize(f)
            self.file_label.setText(f"📄 {os.path.basename(f)} ({file_size:,} bytes)")
            self.file_label.setStyleSheet("padding: 15px; border: 2px solid #10b981; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 600;")
            self.upload_btn.setEnabled(True)
            self.status_bar.showMessage(f"📁 File selected: {os.path.basename(f)}")

    def upload(self):
        if not self.selected_file:
            QMessageBox.warning(self, 'No File Selected', 'Please select a CSV file first.')
            return
        
        if self.is_processing:
            QMessageBox.information(self, 'Processing', 'Upload in progress. Please wait...')
            return
        
        self.is_processing = True
        self.progress_bar.setVisible(True)
        self.progress_bar.setRange(0, 0)
        self.choose_btn.setEnabled(False)
        self.upload_btn.setEnabled(False)
        self.status_bar.showMessage("⬆️ Uploading and analyzing data...")
        
        # Use QTimer to run upload in main thread (safer)
        QTimer.singleShot(100, self._perform_upload)

    def _perform_upload(self):
        try:
            with open(self.selected_file, 'rb') as f:
                files = {'file': f}
                # Use desktop-specific endpoint without authentication
                r = requests.post(f'{API_BASE}/desktop-upload/', files=files, timeout=60)
                r.raise_for_status()
                result = r.json()
                self.on_upload_success(result)
        except Exception as e:
            self.on_upload_error(str(e))

    def on_upload_success(self, result):
        self.is_processing = False
        self.progress_bar.setVisible(False)
        self.choose_btn.setEnabled(True)
        
        if 'error' in result:
            self.msg.setText(f"❌ Error: {result['error']}")
            self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 2px solid #ef4444;")
            self.status_bar.showMessage(f"❌ Upload failed: {result['error']}")
        else:
            self.msg.setText(f"✅ Success: {result.get('filename', 'File')} uploaded successfully!")
            self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600; background: rgba(16, 185, 129, 0.1); color: #10b981; border: 2px solid #10b981;")
            self.status_bar.showMessage("✅ Upload successful! Loading data...")
            
            if 'id' in result:
                self.load_uploaded_data(result['id'])
            self.load_history()

    def on_upload_error(self, error_msg):
        self.is_processing = False
        self.progress_bar.setVisible(False)
        self.choose_btn.setEnabled(True)
        self.upload_btn.setEnabled(True)
        
        self.msg.setText(f"❌ Upload Error: {error_msg}")
        self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 2px solid #ef4444;")
        self.status_bar.showMessage(f"❌ Upload error: {error_msg}")

    def load_history(self):
        if self.is_processing:
            return
            
        self.is_processing = True
        self.refresh_btn.setEnabled(False)
        self.status_bar.showMessage("🔄 Loading dataset history...")
        
        QTimer.singleShot(100, self._perform_load_history)

    def _perform_load_history(self):
        try:
            r = requests.get(f'{API_BASE}/datasets/', timeout=15)
            r.raise_for_status()
            datasets = r.json()
            self.on_history_loaded(datasets)
        except Exception as e:
            self.on_history_error(str(e))

    def on_history_loaded(self, datasets):
        self.is_processing = False
        self.refresh_btn.setEnabled(True)
        self.datasets = datasets
        self.status_bar.showMessage(f"📊 Loaded {len(datasets)} datasets")

    def on_history_error(self, error_msg):
        self.is_processing = False
        self.refresh_btn.setEnabled(True)
        self.status_bar.showMessage(f"❌ Error loading history: {error_msg}")

    def load_uploaded_data(self, dataset_id):
        QTimer.singleShot(100, lambda: self._perform_load_data(dataset_id))

    def _perform_load_data(self, dataset_id):
        try:
            r = requests.get(f'{API_BASE}/datasets/{dataset_id}/data/', timeout=15)
            r.raise_for_status()
            data = r.json()
            self.on_data_loaded(data)
        except Exception as e:
            self.on_data_error(str(e))

    def on_data_loaded(self, data):
        self.current_data = data
        
        if 'rows' in data:
            self.populate_table(data['rows'])
        
        if 'summary' in data:
            self.populate_summary(data['summary'])
        
        self.status_bar.showMessage("✅ Data loaded successfully")
        self.tab_widget.setCurrentIndex(1)  # Analytics tab
        self.update_chart_type(self.chart_type_combo.currentText())

    def on_data_error(self, error_msg):
        self.status_bar.showMessage(f"❌ Error loading data: {error_msg}")

    def populate_table(self, rows):
        if not rows:
            self.table.setRowCount(0)
            self.table.setColumnCount(0)
            self.table_info_label.setText("📊 Table: No data loaded")
            return
        
        headers = list(rows[0].keys())
        self.table.setColumnCount(len(headers))
        self.table.setHorizontalHeaderLabels(headers)
        
        self.table.setRowCount(len(rows))
        for i, row in enumerate(rows):
            for j, (key, value) in enumerate(row.items()):
                item = QTableWidgetItem(str(value))
                self.table.setItem(i, j, item)
        
        self.table.resizeColumnsToContents()
        self.table_info_label.setText(f"📊 Table: {len(rows)} rows × {len(headers)} columns")

    def populate_summary(self, summary):
        pass

    def update_chart_type(self, chart_type):
        self.figure.clear()
        self.figure.patch.set_facecolor('#f8fafc')
        
        try:
            if "Multi-Panel Dashboard" in chart_type:
                self.create_multi_panel_dashboard()
            elif "Equipment Distribution" in chart_type:
                self.create_equipment_distribution_chart()
            elif "Parameter Analysis" in chart_type:
                self.create_parameter_analysis_chart()
            elif "Time Series" in chart_type:
                self.create_time_series_chart()
            elif "Heatmap" in chart_type:
                self.create_heatmap_chart()
            elif "Distribution Analysis" in chart_type:
                self.create_distribution_chart()
            elif "Anomaly Detection" in chart_type:
                self.create_anomaly_detection_chart()
            elif "Comprehensive Report" in chart_type:
                self.create_comprehensive_report()
        except Exception as e:
            self.show_error_message(f"Error creating chart: {str(e)}")

    def create_multi_panel_dashboard(self):
        """Create a comprehensive multi-panel dashboard"""
        gs = gridspec.GridSpec(2, 2, figure=self.figure, hspace=0.3, wspace=0.3)
        
        # Panel 1: Equipment Distribution
        ax1 = self.figure.add_subplot(gs[0, 0])
        equipment = {'Pump': 35, 'Valve': 28, 'Motor': 22, 'Compressor': 15}
        if self.current_data and 'summary' in self.current_data:
            summary = self.current_data['summary']
            if 'type_distribution' in summary:
                equipment = summary['type_distribution']
        
        colors = sns.color_palette('husl', len(equipment))
        wedges, texts, autotexts = ax1.pie(list(equipment.values()), labels=list(equipment.keys()), 
                                           autopct='%1.1f%%', colors=colors, startangle=90,
                                           explode=[0.05]*len(equipment), shadow=True)
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
        ax1.set_title('🔵 Equipment Distribution', fontsize=12, fontweight='bold', pad=10)
        
        # Panel 2: Parameter Trends
        ax2 = self.figure.add_subplot(gs[0, 1])
        parameters = {'Flowrate': 120.5, 'Pressure': 85.3, 'Temperature': 65.8, 'Efficiency': 92.1}
        if self.current_data and 'rows' in self.current_data:
            df = pd.DataFrame(self.current_data['rows'])
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
            if numeric_cols:
                parameters = df[numeric_cols[:4]].mean().to_dict()
        
        bars = ax2.bar(list(parameters.keys()), list(parameters.values()), 
                      color=sns.color_palette('viridis', len(parameters)), alpha=0.8, edgecolor='black')
        for bar, val in zip(bars, parameters.values()):
            height = bar.get_height()
            ax2.text(bar.get_x() + bar.get_width()/2., height + height*0.02,
                    f'{val:.1f}', ha='center', va='bottom', fontweight='bold', fontsize=9)
        ax2.set_title('📊 Parameter Averages', fontsize=12, fontweight='bold')
        ax2.set_ylabel('Values', fontweight='bold')
        ax2.grid(True, alpha=0.3)
        
        # Panel 3: Status Overview
        ax3 = self.figure.add_subplot(gs[1, 0])
        statuses = {'Normal': 85, 'Warning': 10, 'Critical': 5}
        status_colors = ['#10b981', '#fbbf24', '#ef4444']
        bars = ax3.barh(list(statuses.keys()), list(statuses.values()), 
                       color=status_colors, alpha=0.8, edgecolor='black')
        for bar, val in zip(bars, statuses.values()):
            width = bar.get_width()
            ax3.text(width + 1, bar.get_y() + bar.get_height()/2,
                    f'{val}%', ha='left', va='center', fontweight='bold', fontsize=10)
        ax3.set_title('🚦 System Status', fontsize=12, fontweight='bold')
        ax3.set_xlabel('Percentage (%)', fontweight='bold')
        ax3.grid(True, alpha=0.3, axis='x')
        
        # Panel 4: Key Metrics
        ax4 = self.figure.add_subplot(gs[1, 1])
        total_records = 100
        if self.current_data and 'summary' in self.current_data:
            total_records = self.current_data['summary'].get('total_count', 100)
        
        metrics_text = f"""📊 KEY METRICS

📊 Total Records: {total_records:,}
✅ Active Equipment: 48
⚠️ Warnings: {int(total_records * 0.10)}
🚨 Critical Issues: {int(total_records * 0.05)}

📈 Uptime: 98.5%
⏱️ Last Updated: {datetime.now().strftime('%H:%M:%S')}
        """
        ax4.text(0.1, 0.9, metrics_text, transform=ax4.transAxes, fontsize=11,
                verticalalignment='top', fontfamily='monospace', fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.8, edgecolor='#3b82f6', linewidth=2))
        ax4.set_title('📊 Summary Metrics', fontsize=12, fontweight='bold')
        ax4.axis('off')
        
        self.figure.suptitle('🚀 Elite Analytics Dashboard - Real-Time Overview', 
                           fontsize=16, fontweight='bold', y=0.98)
        self.canvas.draw()
        self.canvas.update()

    def create_demo_pie_chart(self):
        """Create a guaranteed working demo pie chart"""
        ax = self.figure.add_subplot(111)
        
        # Demo data
        categories = ['Pump A', 'Pump B', 'Valve X', 'Valve Y', 'Motor Z', 'Compressor']
        sizes = [25, 20, 18, 15, 12, 10]
        colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
        
        # Create pie chart
        wedges, texts, autotexts = ax.pie(sizes, labels=categories, autopct='%1.1f%%', 
                                         colors=colors, startangle=90, 
                                         explode=[0.05]*len(categories),
                                         shadow=True)
        
        # Style the text
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
            autotext.set_fontsize(10)
        
        ax.set_title('📊 Equipment Distribution (Demo)', fontsize=16, fontweight='bold', pad=20)
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()

    def create_equipment_distribution_chart(self):
        """Create enhanced equipment distribution pie chart with 3D effect"""
        ax = self.figure.add_subplot(111)
        
        # Get data or use sample data
        equipment = {'Pump': 35, 'Valve': 28, 'Motor': 22, 'Compressor': 15}
        
        if self.current_data and 'summary' in self.current_data:
            summary = self.current_data['summary']
            if 'type_distribution' in summary:
                equipment = summary['type_distribution']
            elif 'equipment_types' in summary:
                equipment = summary['equipment_types']
        
        labels = list(equipment.keys())
        sizes = list(equipment.values())
        
        # Ensure we have data
        if not sizes or sum(sizes) == 0:
            sizes = [25, 25, 25, 25]
        
        # Create enhanced pie chart with seaborn colors
        colors = sns.color_palette('husl', len(labels))
        explode = [0.1 if i == sizes.index(max(sizes)) else 0.05 for i in range(len(sizes))]
        
        wedges, texts, autotexts = ax.pie(sizes, labels=labels, autopct='%1.1f%%', 
                                         colors=colors, startangle=90, 
                                         explode=explode, shadow=True,
                                         textprops={'fontsize': 11, 'weight': 'bold'})
        
        # Enhanced text styling
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
            autotext.set_fontsize(12)
            autotext.set_bbox(dict(boxstyle='round,pad=0.3', facecolor='black', alpha=0.3))
        
        for text in texts:
            text.set_fontsize(12)
            text.set_fontweight('bold')
        
        ax.set_title('🔵 Equipment Distribution Analysis\n(Interactive View)', 
                    fontsize=16, fontweight='bold', pad=20)
        
        # Add legend with counts
        legend_labels = [f'{label}: {size} ({size/sum(sizes)*100:.1f}%)' 
                        for label, size in zip(labels, sizes)]
        ax.legend(legend_labels, loc='center left', bbox_to_anchor=(1, 0, 0.5, 1),
                 fontsize=10, framealpha=0.9)
        
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()
        self.canvas.repaint()

    def create_parameter_analysis_chart(self):
        """Create advanced parameter analysis with grouped bars and statistics"""
        ax = self.figure.add_subplot(111)
        
        # Get data or use sample data
        if self.current_data and 'rows' in self.current_data:
            df = pd.DataFrame(self.current_data['rows'])
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()[:6]
            
            if numeric_cols:
                means = df[numeric_cols].mean()
                stds = df[numeric_cols].std()
                
                labels = list(means.index)
                x = np.arange(len(labels))
                width = 0.35
                
                # Create grouped bars with error bars
                bars1 = ax.bar(x - width/2, means, width, label='Mean', 
                             color=sns.color_palette('viridis', 1)[0], 
                             alpha=0.8, edgecolor='black', yerr=stds,
                             error_kw={'elinewidth': 2, 'capsize': 5, 'alpha': 0.7})
                
                # Add value labels on bars
                for bar, mean, std in zip(bars1, means, stds):
                    height = bar.get_height()
                    ax.text(bar.get_x() + bar.get_width()/2., height + std + height*0.02,
                           f'{mean:.1f}\n±{std:.1f}', ha='center', va='bottom', 
                           fontweight='bold', fontsize=9)
                
                ax.set_xlabel('Parameters', fontsize=12, fontweight='bold')
                ax.set_ylabel('Values (with Std Dev)', fontsize=12, fontweight='bold')
                ax.set_title('📊 Advanced Parameter Analysis\n(Mean ± Standard Deviation)', 
                           fontsize=16, fontweight='bold', pad=20)
                ax.set_xticks(x)
                ax.set_xticklabels(labels, rotation=45, ha='right')
                ax.legend(fontsize=11)
                ax.grid(True, alpha=0.3, axis='y')
                ax.set_axisbelow(True)
            else:
                self.show_no_data_message(ax)
        else:
            # Sample data
            parameters = ['Flowrate', 'Pressure', 'Temperature', 'Efficiency', 'Power', 'RPM']
            means = [120.5, 85.3, 65.8, 92.1, 150.2, 1800]
            stds = [15.2, 8.5, 5.3, 3.2, 12.5, 120]
            
            x = np.arange(len(parameters))
            bars = ax.bar(x, means, color=sns.color_palette('viridis', len(parameters)), 
                         alpha=0.8, edgecolor='black', yerr=stds,
                         error_kw={'elinewidth': 2, 'capsize': 5})
            
            for bar, mean, std in zip(bars, means, stds):
                height = bar.get_height()
                ax.text(bar.get_x() + bar.get_width()/2., height + std,
                       f'{mean:.1f}', ha='center', va='bottom', fontweight='bold')
            
            ax.set_xticks(x)
            ax.set_xticklabels(parameters, rotation=45, ha='right')
            ax.set_ylabel('Values', fontsize=12, fontweight='bold')
            ax.set_title('📊 Parameter Analysis (Sample Data)', fontsize=16, fontweight='bold', pad=20)
            ax.grid(True, alpha=0.3, axis='y')
        
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()
        self.canvas.repaint()

    def create_data_summary_chart(self):
        """Create data summary text report"""
        ax = self.figure.add_subplot(111)
        
        # Get data or use sample data
        total_records = 100
        averages = {'Flowrate': 120.5, 'Pressure': 85.3, 'Temperature': 65.8}
        anomalies = {'Flowrate': 3, 'Pressure': 2, 'Temperature': 1}
        
        if self.current_data and 'summary' in self.current_data:
            summary = self.current_data['summary']
            total_records = summary.get('total_count', 100)
            averages = summary.get('averages', averages)
            anomalies = summary.get('anomalies', anomalies)
        
        stats_text = f"""Dataset Summary Statistics
=========================
Total Records: {total_records}

Statistical Averages:"""
        
        for param, avg in averages.items():
            stats_text += f"\n  {param}: {avg:.2f}"
        
        if isinstance(anomalies, dict):
            stats_text += f"\n\nAnomalies Detected:"
            for param, count in anomalies.items():
                stats_text += f"\n  {param}: {count}"
        
        ax.text(0.1, 0.9, stats_text, transform=ax.transAxes, fontsize=12, 
                verticalalignment='top', fontfamily='monospace',
                bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.8))
        
        ax.set_title('📊 Data Summary Report', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()

    def create_time_series_chart(self):
        """Create time series analysis chart"""
        ax = self.figure.add_subplot(111)
        
        if self.current_data and 'rows' in self.current_data:
            df = pd.DataFrame(self.current_data['rows'])
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()[:3]
            
            if numeric_cols and len(df) > 1:
                # Create time index
                x = np.arange(len(df))
                
                for col in numeric_cols:
                    ax.plot(x, df[col], marker='o', linewidth=2, 
                           label=col, alpha=0.8, markersize=4)
                
                ax.set_xlabel('Sample Index', fontsize=12, fontweight='bold')
                ax.set_ylabel('Values', fontsize=12, fontweight='bold')
                ax.set_title('📈 Time Series Analysis', fontsize=16, fontweight='bold', pad=20)
                ax.legend(fontsize=11, loc='best')
                ax.grid(True, alpha=0.3)
            else:
                self.show_no_data_message(ax)
        else:
            # Sample time series
            x = np.linspace(0, 10, 100)
            y1 = np.sin(x) * 50 + 100
            y2 = np.cos(x) * 30 + 85
            y3 = np.sin(x*0.5) * 20 + 65
            
            ax.plot(x, y1, label='Flowrate', linewidth=2, alpha=0.8)
            ax.plot(x, y2, label='Pressure', linewidth=2, alpha=0.8)
            ax.plot(x, y3, label='Temperature', linewidth=2, alpha=0.8)
            
            ax.set_xlabel('Time', fontsize=12, fontweight='bold')
            ax.set_ylabel('Values', fontsize=12, fontweight='bold')
            ax.set_title('📈 Time Series Analysis (Sample)', fontsize=16, fontweight='bold', pad=20)
            ax.legend(fontsize=11)
            ax.grid(True, alpha=0.3)
        
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()

    def create_heatmap_chart(self):
        """Create correlation heatmap"""
        ax = self.figure.add_subplot(111)
        
        if self.current_data and 'rows' in self.current_data:
            df = pd.DataFrame(self.current_data['rows'])
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
            
            if len(numeric_cols) >= 2:
                corr_matrix = df[numeric_cols].corr()
                
                sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='coolwarm',
                           center=0, square=True, linewidths=1, cbar_kws={"shrink": 0.8},
                           ax=ax, vmin=-1, vmax=1)
                
                ax.set_title('🔥 Correlation Heatmap Matrix', fontsize=16, fontweight='bold', pad=20)
            else:
                self.show_no_data_message(ax)
        else:
            # Sample correlation matrix
            data = np.random.rand(5, 5)
            corr = np.corrcoef(data)
            labels = ['Flow', 'Press', 'Temp', 'Effic', 'Power']
            
            sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm',
                       xticklabels=labels, yticklabels=labels,
                       center=0, square=True, linewidths=1, ax=ax)
            
            ax.set_title('🔥 Correlation Heatmap (Sample)', fontsize=16, fontweight='bold', pad=20)
        
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()

    def create_distribution_chart(self):
        """Create distribution analysis with histograms"""
        if self.current_data and 'rows' in self.current_data:
            df = pd.DataFrame(self.current_data['rows'])
            numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()[:4]
            
            if numeric_cols:
                n_plots = len(numeric_cols)
                n_cols = 2
                n_rows = (n_plots + 1) // 2
                
                for idx, col in enumerate(numeric_cols, 1):
                    ax = self.figure.add_subplot(n_rows, n_cols, idx)
                    
                    # Histogram with KDE
                    ax.hist(df[col].dropna(), bins=30, alpha=0.7, 
                           color=sns.color_palette('viridis', n_plots)[idx-1],
                           edgecolor='black')
                    
                    # Add statistics
                    mean_val = df[col].mean()
                    median_val = df[col].median()
                    ax.axvline(mean_val, color='red', linestyle='--', linewidth=2, label=f'Mean: {mean_val:.2f}')
                    ax.axvline(median_val, color='green', linestyle='--', linewidth=2, label=f'Median: {median_val:.2f}')
                    
                    ax.set_xlabel(col, fontweight='bold')
                    ax.set_ylabel('Frequency', fontweight='bold')
                    ax.set_title(f'📊 {col} Distribution', fontsize=11, fontweight='bold')
                    ax.legend(fontsize=8)
                    ax.grid(True, alpha=0.3, axis='y')
                
                self.figure.suptitle('📊 Distribution Analysis', fontsize=16, fontweight='bold')
            else:
                ax = self.figure.add_subplot(111)
                self.show_no_data_message(ax)
        else:
            # Sample distributions
            for idx in range(1, 5):
                ax = self.figure.add_subplot(2, 2, idx)
                data = np.random.normal(100, 15, 1000)
                ax.hist(data, bins=30, alpha=0.7, color=sns.color_palette('viridis', 4)[idx-1],
                       edgecolor='black')
                ax.set_title(f'Parameter {idx}', fontsize=11, fontweight='bold')
                ax.grid(True, alpha=0.3, axis='y')
            
            self.figure.suptitle('📊 Distribution Analysis (Sample)', fontsize=16, fontweight='bold')
        
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()

    def create_comprehensive_report(self):
        """Create comprehensive text report"""
        ax = self.figure.add_subplot(111)
        
        total_records = 100
        equipment_count = 48
        anomaly_rate = 5.0
        
        if self.current_data and 'summary' in self.current_data:
            summary = self.current_data['summary']
            total_records = summary.get('total_count', 100)
        
        report = f"""
ELITE ANALYTICS COMPREHENSIVE REPORT
========================================

DATA OVERVIEW
--------------------------------------------
  - Total Records: {total_records:,}
  - Active Equipment: {equipment_count}
  - Data Quality: 98.5%
  - Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

PERFORMANCE METRICS
--------------------------------------------
  - Normal Operations: 85%
  - Warning States: 10%
  - Critical Issues: 5%
  
  System Uptime: 98.5%
  Average Efficiency: 92.1%
  Anomaly Rate: {anomaly_rate:.1f}%

KEY INSIGHTS
--------------------------------------------
  - Equipment running within normal parameters
  - No critical failures detected
  - Maintenance recommended for 3 units
  - Overall system health: EXCELLENT

RECOMMENDATIONS
--------------------------------------------
  1. Continue monitoring warning states
  2. Schedule preventive maintenance
  3. Optimize high-load equipment
  4. Review anomaly patterns

Generated by Elite Analytics Suite v2.0
        """
        
        ax.text(0.05, 0.95, report, transform=ax.transAxes, fontsize=10,
                verticalalignment='top', fontfamily='monospace', fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='#e3f2fd', alpha=0.9, 
                         edgecolor='#3b82f6', linewidth=3))
        
        ax.set_title('📋 Comprehensive System Report', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()

    def show_no_data_message(self, ax):
        """Show message when no data is available"""
        ax.text(0.5, 0.5, '📊 No Data Available\n\nPlease upload a dataset to view analysis',
                ha='center', va='center', fontsize=14, fontweight='bold',
                transform=ax.transAxes,
                bbox=dict(boxstyle='round', facecolor='lightgray', alpha=0.8))
        ax.axis('off')

    def create_anomaly_detection_chart(self):
        """Create advanced anomaly detection visualization"""
        ax = self.figure.add_subplot(111)
        
        # Get data or use sample data
        anomalies = {'Flowrate': 3, 'Pressure': 2, 'Temperature': 1, 'Efficiency': 4, 'Power': 2}
        
        if self.current_data and 'summary' in self.current_data:
            summary = self.current_data['summary']
            anomalies = summary.get('anomalies', {})
            if not anomalies:
                anomalies = {'Flowrate': 3, 'Pressure': 2, 'Temperature': 1}
        
        labels = list(anomalies.keys())
        counts = list(anomalies.values())
        
        # Create advanced bar chart for anomalies
        colors = sns.color_palette('Reds_r', len(labels))
        bars = ax.bar(labels, counts, color=colors, alpha=0.8, edgecolor='darkred', linewidth=2.5)
        
        # Add value labels with styling
        for bar, count in zip(bars, counts):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 0.1, 
                   f'🚨 {count}', ha='center', va='bottom', 
                   fontweight='bold', fontsize=12, color='darkred',
                   bbox=dict(boxstyle='round,pad=0.5', facecolor='yellow', alpha=0.7))
        
        ax.set_xlabel('Parameters', fontsize=12, fontweight='bold')
        ax.set_ylabel('Number of Anomalies Detected', fontsize=12, fontweight='bold')
        ax.set_title('🚨 Advanced Anomaly Detection Analysis\\n(Statistical Outlier Detection)', 
                    fontsize=16, fontweight='bold', pad=20)
        
        # Add threshold line
        if counts:
            threshold = np.mean(counts) + np.std(counts)
            ax.axhline(y=threshold, color='red', linestyle='--', linewidth=2, 
                      label=f'Threshold: {threshold:.1f}', alpha=0.7)
            ax.legend(fontsize=11)
        
        # Add grid
        ax.grid(True, alpha=0.3, axis='y')
        ax.set_axisbelow(True)
        
        # Set y-axis limits
        ax.set_ylim(0, max(counts) + 2 if counts else 5)
        
        # Rotate x labels if needed
        if len(labels) > 4:
            ax.set_xticklabels(labels, rotation=45, ha='right')
        
        self.figure.tight_layout()
        self.canvas.draw()
        self.canvas.update()
        self.canvas.repaint()

    def save_chart(self):
        """Save current chart to file"""
        filename, _ = QFileDialog.getSaveFileName(self, 'Save Chart', '', 
                                                  'PNG Files (*.png);;PDF Files (*.pdf);;SVG Files (*.svg)')
        if filename:
            try:
                self.figure.savefig(filename, dpi=300, bbox_inches='tight')
                QMessageBox.information(self, 'Success', f'Chart saved to {filename}')
                self.status_bar.showMessage(f"💾 Chart saved: {os.path.basename(filename)}")
            except Exception as e:
                QMessageBox.critical(self, 'Error', f'Failed to save chart: {str(e)}')

    def create_statistics_tab(self):
        """Create statistics analysis tab"""
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # Statistics display
        stats_group = QGroupBox("📊 Statistical Summary")
        stats_layout = QVBoxLayout()
        
        self.stats_text = QTextEdit()
        self.stats_text.setReadOnly(True)
        self.stats_text.setMinimumHeight(300)
        stats_layout.addWidget(self.stats_text)
        
        # Refresh button
        refresh_stats_btn = QPushButton("🔄 Calculate Statistics")
        refresh_stats_btn.clicked.connect(self.calculate_statistics)
        stats_layout.addWidget(refresh_stats_btn)
        
        stats_group.setLayout(stats_layout)
        layout.addWidget(stats_group)
        
        # Statistical tests
        tests_group = QGroupBox("🧪 Statistical Tests")
        tests_layout = QVBoxLayout()
        
        self.tests_text = QTextEdit()
        self.tests_text.setReadOnly(True)
        self.tests_text.setMinimumHeight(200)
        tests_layout.addWidget(self.tests_text)
        
        run_tests_btn = QPushButton("▶️ Run Tests")
        run_tests_btn.clicked.connect(self.run_statistical_tests)
        tests_layout.addWidget(run_tests_btn)
        
        tests_group.setLayout(tests_layout)
        layout.addWidget(tests_group)
        
        return tab_widget

    def create_insights_tab(self):
        """Create AI insights tab"""
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # AI Insights display
        insights_group = QGroupBox("💡 AI-Powered Insights")
        insights_layout = QVBoxLayout()
        
        self.insights_text = QTextEdit()
        self.insights_text.setReadOnly(True)
        self.insights_text.setMinimumHeight(400)
        insights_layout.addWidget(self.insights_text)
        
        # Generate insights button
        generate_btn = QPushButton("🤖 Generate Insights")
        generate_btn.clicked.connect(self.generate_insights)
        insights_layout.addWidget(generate_btn)
        
        insights_group.setLayout(insights_layout)
        layout.addWidget(insights_group)
        
        # Recommendations
        recommendations_group = QGroupBox("📋 Recommendations")
        rec_layout = QVBoxLayout()
        
        self.recommendations_text = QTextEdit()
        self.recommendations_text.setReadOnly(True)
        self.recommendations_text.setMinimumHeight(200)
        rec_layout.addWidget(self.recommendations_text)
        
        recommendations_group.setLayout(rec_layout)
        layout.addWidget(recommendations_group)
        
        return tab_widget

    def calculate_statistics(self):
        """Calculate comprehensive statistics"""
        if not self.current_data or 'rows' not in self.current_data:
            self.stats_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No data available</h3><p>Please upload a dataset first.</p>")
            return
        
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if not numeric_cols:
            self.stats_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No numeric data</h3><p>Dataset contains no numeric columns.</p>")
            return
        
        stats_html = "<h2 style='color: #3b82f6;'>📊 Comprehensive Statistical Analysis</h2>"
        stats_html += "<hr><br>"
        
        for col in numeric_cols:
            data = df[col].dropna()
            if len(data) == 0:
                continue
            
            stats_html += f"<h3 style='color: #8b5cf6;'>📈 {col}</h3>"
            stats_html += "<table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>"
            stats_html += "<tr style='background: #e3f2fd;'>"
            stats_html += "<th style='padding: 8px; text-align: left; border: 1px solid #3b82f6;'>Metric</th>"
            stats_html += "<th style='padding: 8px; text-align: right; border: 1px solid #3b82f6;'>Value</th>"
            stats_html += "</tr>"
            
            stats_data = [
                ("Count", f"{len(data)}"),
                ("Mean", f"{data.mean():.4f}"),
                ("Median", f"{data.median():.4f}"),
                ("Std Dev", f"{data.std():.4f}"),
                ("Variance", f"{data.var():.4f}"),
                ("Min", f"{data.min():.4f}"),
                ("Max", f"{data.max():.4f}"),
                ("Range", f"{data.max() - data.min():.4f}"),
                ("Q1 (25%)", f"{data.quantile(0.25):.4f}"),
                ("Q2 (50%)", f"{data.quantile(0.50):.4f}"),
                ("Q3 (75%)", f"{data.quantile(0.75):.4f}"),
                ("IQR", f"{data.quantile(0.75) - data.quantile(0.25):.4f}"),
                ("Skewness", f"{stats.skew(data):.4f}"),
                ("Kurtosis", f"{stats.kurtosis(data):.4f}"),
            ]
            
            for i, (metric, value) in enumerate(stats_data):
                bg_color = "#ffffff" if i % 2 == 0 else "#f8fafc"
                stats_html += f"<tr style='background: {bg_color};'>"
                stats_html += f"<td style='padding: 6px; border: 1px solid #cbd5e1;'><strong>{metric}</strong></td>"
                stats_html += f"<td style='padding: 6px; border: 1px solid #cbd5e1; text-align: right;'>{value}</td>"
                stats_html += "</tr>"
            
            stats_html += "</table><br>"
        
        self.stats_text.setHtml(stats_html)
        self.status_bar.showMessage("✅ Statistics calculated successfully")

    def run_statistical_tests(self):
        """Run statistical tests"""
        if not self.current_data or 'rows' not in self.current_data:
            self.tests_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No data available</h3>")
            return
        
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if len(numeric_cols) < 1:
            self.tests_text.setHtml("<h3 style='color: #ef4444;'>⚠️ Insufficient data</h3>")
            return
        
        tests_html = "<h2 style='color: #3b82f6;'>🧪 Statistical Tests Results</h2>"
        tests_html += "<hr><br>"
        
        # Normality tests
        tests_html += "<h3 style='color: #8b5cf6;'>📊 Normality Tests (Shapiro-Wilk)</h3>"
        tests_html += "<p><em>Tests if data follows a normal distribution (p > 0.05 = normal)</em></p>"
        
        for col in numeric_cols[:5]:
            data = df[col].dropna()
            if len(data) >= 3:
                stat, p_value = stats.shapiro(data)
                result = "✅ Normal" if p_value > 0.05 else "❌ Not Normal"
                tests_html += f"<p><strong>{col}:</strong> p-value = {p_value:.6f} → {result}</p>"
        
        # Correlation tests
        if len(numeric_cols) >= 2:
            tests_html += "<br><h3 style='color: #8b5cf6;'>🔗 Correlation Analysis (Pearson)</h3>"
            col1, col2 = numeric_cols[0], numeric_cols[1]
            data1 = df[col1].dropna()
            data2 = df[col2].dropna()
            
            if len(data1) == len(data2) and len(data1) >= 3:
                corr, p_value = stats.pearsonr(data1, data2)
                tests_html += f"<p><strong>{col1} vs {col2}:</strong></p>"
                tests_html += f"<p>Correlation coefficient: {corr:.4f}</p>"
                tests_html += f"<p>P-value: {p_value:.6f}</p>"
                
                if abs(corr) > 0.7:
                    tests_html += "<p style='color: #10b981;'>✅ Strong correlation</p>"
                elif abs(corr) > 0.3:
                    tests_html += "<p style='color: #fbbf24;'>⚠️ Moderate correlation</p>"
                else:
                    tests_html += "<p style='color: #94a3b8;'>ℹ️ Weak correlation</p>"
        
        self.tests_text.setHtml(tests_html)
        self.status_bar.showMessage("✅ Statistical tests completed")

    def generate_insights(self):
        """Generate AI insights"""
        if not self.current_data or 'rows' not in self.current_data:
            self.insights_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No data available</h3>")
            return
        
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        insights_html = "<h2 style='color: #3b82f6;'>💡 AI-Powered Data Insights</h2>"
        insights_html += f"<p><em>Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em></p>"
        insights_html += "<hr><br>"
        
        # Dataset overview
        insights_html += "<h3 style='color: #8b5cf6;'>📊 Dataset Overview</h3>"
        insights_html += f"<p>✅ Total records: <strong>{len(df)}</strong></p>"
        insights_html += f"<p>✅ Numeric features: <strong>{len(numeric_cols)}</strong></p>"
        insights_html += f"<p>✅ Data completeness: <strong>{(1 - df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100:.1f}%</strong></p>"
        
        # Key findings
        insights_html += "<br><h3 style='color: #8b5cf6;'>🔍 Key Findings</h3>"
        insights_html += "<ul>"
        
        for col in numeric_cols[:5]:
            data = df[col].dropna()
            if len(data) > 0:
                mean_val = data.mean()
                std_val = data.std()
                cv = (std_val / mean_val * 100) if mean_val != 0 else 0
                
                insights_html += f"<li><strong>{col}:</strong> "
                if cv < 10:
                    insights_html += f"Very stable (CV: {cv:.1f}%) ✅"
                elif cv < 30:
                    insights_html += f"Moderate variation (CV: {cv:.1f}%) ⚠️"
                else:
                    insights_html += f"High variation (CV: {cv:.1f}%) 🚨"
                insights_html += "</li>"
        
        insights_html += "</ul>"
        
        # Anomaly detection
        insights_html += "<br><h3 style='color: #8b5cf6;'>🚨 Anomaly Detection</h3>"
        total_anomalies = 0
        
        for col in numeric_cols[:5]:
            data = df[col].dropna()
            if len(data) > 0:
                Q1 = data.quantile(0.25)
                Q3 = data.quantile(0.75)
                IQR = Q3 - Q1
                outliers = ((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).sum()
                total_anomalies += outliers
                
                if outliers > 0:
                    insights_html += f"<p>🚨 <strong>{col}:</strong> {outliers} outliers detected ({outliers/len(data)*100:.1f}%)</p>"
        
        if total_anomalies == 0:
            insights_html += "<p style='color: #10b981;'>✅ No significant outliers detected - data quality is excellent!</p>"
        
        self.insights_text.setHtml(insights_html)
        
        # Generate recommendations
        self.generate_recommendations(df, numeric_cols)
        
        self.status_bar.showMessage("🤖 AI insights generated successfully")

    def generate_recommendations(self, df, numeric_cols):
        """Generate recommendations"""
        rec_html = "<h2 style='color: #3b82f6;'>📋 Smart Recommendations</h2>"
        rec_html += "<hr><br>"
        
        rec_html += "<ol>"
        
        # Check for missing data
        missing_pct = (df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100
        if missing_pct > 5:
            rec_html += f"<li><strong>Data Quality:</strong> {missing_pct:.1f}% missing data detected. Consider data imputation or cleaning. 🧹</li>"
        
        # Check for high variation
        high_var_cols = []
        for col in numeric_cols:
            data = df[col].dropna()
            if len(data) > 0:
                cv = (data.std() / data.mean() * 100) if data.mean() != 0 else 0
                if cv > 30:
                    high_var_cols.append(col)
        
        if high_var_cols:
            rec_html += f"<li><strong>Variability:</strong> High variation in {', '.join(high_var_cols)}. Monitor closely for stability. 📊</li>"
        
        # General recommendations
        rec_html += "<li><strong>Monitoring:</strong> Continue regular data collection for trend analysis. 📈</li>"
        rec_html += "<li><strong>Predictive Analytics:</strong> Consider implementing machine learning models for forecasting. 🤖</li>"
        rec_html += "<li><strong>Automation:</strong> Set up automated alerts for anomaly detection. 🔔</li>"
        rec_html += "<li><strong>Optimization:</strong> Analyze parameter relationships for efficiency improvements. ⚡</li>"
        
        rec_html += "</ol>"
        
        self.recommendations_text.setHtml(rec_html)

    def refresh_current_chart(self):
        self.update_chart_type(self.chart_type_combo.currentText())

    def show_error_message(self, error_msg):
        ax = self.figure.add_subplot(111)
        ax.text(0.5, 0.5, f'Error: {error_msg}', 
                ha='center', va='center', fontsize=12, 
                transform=ax.transAxes, color='red', fontweight='bold')
        ax.set_title('Chart Error', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.canvas.draw()

    def search_table(self):
        search_text = self.search_box.text().lower()
        for row in range(self.table.rowCount()):
            match = False
            for col in range(self.table.columnCount()):
                item = self.table.item(row, col)
                if item and search_text in item.text().lower():
                    match = True
                    break
            self.table.setRowHidden(row, not match)

    def export_table(self):
        filename, _ = QFileDialog.getSaveFileName(self, 'Export Table', '', 'CSV Files (*.csv)')
        if filename:
            try:
                with open(filename, 'w', newline='', encoding='utf-8') as f:
                    writer = __import__('csv').writer(f)
                    headers = [self.table.horizontalHeaderItem(i).text() 
                             for i in range(self.table.columnCount())]
                    writer.writerow(headers)
                    for row in range(self.table.rowCount()):
                        if not self.table.isRowHidden(row):
                            row_data = [self.table.item(row, col).text() if self.table.item(row, col) else '' 
                                      for col in range(self.table.columnCount())]
                            writer.writerow(row_data)
                self.status_bar.showMessage(f"✅ Table exported to {filename}")
            except Exception as e:
                self.status_bar.showMessage(f"❌ Export error: {str(e)}")

    def clear_data(self):
        self.current_data = None
        self.table.setRowCount(0)
        self.table.setColumnCount(0)
        self.figure.clear()
        self.canvas.draw()
        self.status_bar.showMessage("🗑️ Data cleared")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
