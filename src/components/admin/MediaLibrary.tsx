import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Folder, 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List,
  MoreVertical,
  Download,
  Trash2,
  Copy,
  Link as LinkIcon,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  File
} from 'lucide-react';

// Media item interface
interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'other';
  url: string;
  thumbnail?: string;
  size: number;
  dimensions?: string;
  uploadedAt: string;
  tags: string[];
  folder: string;
}

// Sample media items for demonstration
const sampleMedia: MediaItem[] = [];

// Folders for organization
const folders = [
  { id: 'all', name: 'All Files', count: 0 },
  { id: 'marketing', name: 'Marketing', count: 0 },
  { id: 'about', name: 'About', count: 0 },
  { id: 'services', name: 'Services', count: 0 },
  { id: 'documents', name: 'Documents', count: 0 },
  { id: 'branding', name: 'Branding', count: 0 },
  { id: 'products', name: 'Products', count: 0 }
];

const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>(sampleMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Filter media based on search, type, and folder
  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    
    return matchesSearch && matchesType && matchesFolder;
  });

  // Handle file selection
  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map(item => item.id));
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setUploadedFiles(files);
      setIsUploading(true);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            setShowUploadModal(false);
            
            // Add uploaded files to media library (mock)
            const newMedia = files.map((file, index) => ({
              id: `new-${Date.now()}-${index}`,
              name: file.name,
              type: getFileType(file.type),
              url: URL.createObjectURL(file),
              thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
              size: file.size,
              dimensions: file.type.startsWith('image/') ? '1920x1080' : undefined,
              uploadedAt: new Date().toISOString().split('T')[0],
              tags: [],
              folder: selectedFolder === 'all' ? 'uncategorized' : selectedFolder
            }));
            
            setMedia(prev => [...newMedia, ...prev]);
          }, 500);
        }
      }, 200);
    }
  };

  // Get file type from MIME type
  const getFileType = (mimeType: string): 'image' | 'video' | 'document' | 'other' => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('application/pdf') || 
        mimeType.startsWith('application/msword') || 
        mimeType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml')) {
      return 'document';
    }
    return 'other';
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setMedia(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  // Handle copy link
  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setShowLinkCopied(true);
    setTimeout(() => setShowLinkCopied(false), 2000);
  };

  // Create new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // In a real app, this would call an API to create the folder
      console.log('Creating folder:', newFolderName);
      setShowCreateFolderModal(false);
      setNewFolderName('');
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  // Get icon for file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'document': return FileText;
      default: return File;
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Header */}
      <motion.div variants={fadeIn}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600 mt-1">Manage your images, videos, and documents</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowCreateFolderModal(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Folder className="h-5 w-5" />
              <span>New Folder</span>
            </button>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Files</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{media.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <File className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Images</p>
              <p className="text-2xl font-bold text-gray-900">
                {media.filter(item => item.type === 'image').length}
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <ImageIcon className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900">
                {media.filter(item => item.type === 'video').length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">
                {media.filter(item => item.type === 'document').length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-blue-700 font-medium">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const selectedMedia = media.find(m => m.id === selectedItems[0]);
                  if (selectedMedia) {
                    handleCopyLink(selectedMedia.url);
                  }
                }}
                disabled={selectedItems.length !== 1}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Folder Navigation and Media Content */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <motion.div 
          variants={fadeIn}
          className="md:col-span-1"
        >
          <div className="bg-white rounded-xl p-6 custom-shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Folders</h3>
            <ul className="space-y-2">
              {folders.map((folder) => (
                <li key={folder.id}>
                  <button
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Folder className="h-5 w-5" />
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Media Content */}
        <motion.div 
          variants={fadeIn}
          className="md:col-span-3"
        >
          <div className="bg-white rounded-xl p-6 custom-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">
                {selectedFolder === 'all' ? 'All Files' : folders.find(f => f.id === selectedFolder)?.name}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {selectedItems.length === filteredMedia.length && filteredMedia.length > 0
                    ? 'Deselect All'
                    : 'Select All'}
                </button>
              </div>
            </div>

            {filteredMedia.length === 0 ? (
              <div className="text-center py-12">
                <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'Upload files to get started'}
                </p>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Files
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((item) => {
                  const FileIcon = getFileIcon(item.type);
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`border rounded-lg overflow-hidden ${
                        selectedItems.includes(item.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                      }`}
                    >
                      <div className="relative">
                        {/* Thumbnail or Icon */}
                        {item.type === 'image' ? (
                          <div className="aspect-square bg-gray-100">
                            <img 
                              src={item.thumbnail || item.url} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : item.type === 'video' && item.thumbnail ? (
                          <div className="aspect-square bg-gray-100 relative">
                            <img 
                              src={item.thumbnail} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black bg-opacity-50 rounded-full p-2">
                                <Video className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <FileIcon className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Selection Checkbox */}
                        <div className="absolute top-2 left-2">
                          <button
                            onClick={() => handleSelectItem(item.id)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              selectedItems.includes(item.id)
                                ? 'bg-blue-500 text-white'
                                : 'bg-white bg-opacity-80 text-gray-600 border border-gray-300'
                            }`}
                          >
                            {selectedItems.includes(item.id) && (
                              <CheckCircle className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="truncate">
                            <p className="font-medium text-gray-900 text-sm truncate" title={item.name}>
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(item.size)}
                              {item.dimensions && ` • ${item.dimensions}`}
                            </p>
                          </div>
                          <div className="dropdown relative">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedItems.length === filteredMedia.length && filteredMedia.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dimensions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMedia.map((item) => {
                      const FileIcon = getFileIcon(item.type);
                      
                      return (
                        <tr key={item.id} className={selectedItems.includes(item.id) ? 'bg-blue-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {item.thumbnail ? (
                                <img 
                                  src={item.thumbnail} 
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                  <FileIcon className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-500">
                                  {item.tags.map(tag => `#${tag}`).join(', ')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatFileSize(item.size)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.dimensions || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.uploadedAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleCopyLink(item.url)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Copy Link"
                              >
                                <LinkIcon className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-green-600 hover:text-green-900"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  setMedia(prev => prev.filter(m => m.id !== item.id));
                                }}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Upload Files</h2>
              <button
                onClick={() => {
                  if (!isUploading) {
                    setShowUploadModal(false);
                    setUploadedFiles([]);
                  }
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {isUploading ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Uploading {uploadedFiles.length} file(s)...</h3>
                    <p className="text-gray-600 mb-4">Please wait while your files are being uploaded</p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  
                  <p className="text-center text-gray-600">{uploadProgress}% complete</p>
                  
                  <div className="max-h-60 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={file.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div>
                          {uploadProgress >= 100 ? (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      className="hidden"
                    />
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Drag and drop files here</h3>
                    <p className="text-gray-600 mb-4">or click to browse your computer</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Select Files
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Upload to folder</h4>
                    <select
                      value={selectedFolder}
                      onChange={(e) => setSelectedFolder(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {folders.filter(f => f.id !== 'all').map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Accepted File Types</h4>
                    <div className="text-sm text-gray-600">
                      <p>Images: JPG, PNG, GIF, SVG, WebP</p>
                      <p>Videos: MP4, WebM, MOV</p>
                      <p>Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX</p>
                      <p>Maximum file size: 10MB</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  if (!isUploading) {
                    setShowUploadModal(false);
                    setUploadedFiles([]);
                  }
                }}
                disabled={isUploading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Folder</h2>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Project Assets"
              />
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateFolderModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newFolderName.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Folder
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Link Copied Toast */}
      {showLinkCopied && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Link copied to clipboard</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MediaLibrary;