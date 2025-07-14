import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  IconButton, 
  Avatar, 
  Chip, 
  Divider,
  CircularProgress,
  List,
  ListItem,
  Card,
  CardContent,
  useTheme,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import CodeIcon from '@mui/icons-material/Code';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import useStore from '../../context/store';
import { primaryGradient } from '../../styles/theme';
import ReactMarkdown from 'react-markdown';

// Styled components
const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  height: '100%',
  overflow: 'hidden'
}));

const MessageList = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isUser' && prop !== 'agentColor'
})(({ theme, isUser, agentColor }) => ({
  padding: theme.spacing(2),
  maxWidth: '80%',
  borderRadius: 12,
  position: 'relative',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser 
    ? theme.palette.primary.main 
    : agentColor 
      ? `${agentColor}15` // 15% opacity of agent color for background
      : theme.palette.background.default,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  border: isUser 
    ? 'none' 
    : agentColor 
      ? `1px solid ${agentColor}30` // 30% opacity for border
      : `1px solid ${theme.palette.divider}`,
  '&::after': isUser ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: -8,
    width: 0,
    height: 0,
    border: '8px solid transparent',
    borderTopColor: theme.palette.primary.main,
    borderBottom: 0,
    marginBottom: 0,
    borderRight: 0
  } : {},
  '&::before': !isUser ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: -8,
    width: 0,
    height: 0,
    border: '8px solid transparent',
    borderTopColor: agentColor ? `${agentColor}30` : theme.palette.divider,
    borderBottom: 0,
    marginBottom: 0,
    borderLeft: 0
  } : {}
}));

const SystemMessage = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  maxWidth: '90%',
  borderRadius: 8,
  alignSelf: 'center',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1)
}));

const FileUploadArea = styled(Box)(({ theme, isDragActive, isDragReject }) => ({
  border: `2px dashed ${isDragReject 
    ? theme.palette.error.main 
    : isDragActive 
      ? theme.palette.primary.main 
      : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isDragActive 
    ? `${theme.palette.primary.main}10` 
    : theme.palette.background.default,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}05`,
    borderColor: theme.palette.primary.main
  }
}));

const FilePreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const MessageInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: theme.palette.background.default,
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}30`
    }
  }
}));

const AgentAvatar = styled(Avatar)(({ theme, agentColor }) => ({
  backgroundColor: agentColor || theme.palette.primary.main,
  width: 32,
  height: 32,
  fontSize: '0.875rem'
}));

const MessageActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1)
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(0.5, 2)
}));

const AttachmentCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`
}));

// Helper function to get file icon based on file type
const getFileIcon = (fileType) => {
  if (fileType.includes('pdf')) return <PictureAsPdfIcon />;
  if (fileType.includes('csv') || fileType.includes('excel') || fileType.includes('spreadsheet')) return <TableChartIcon />;
  if (fileType.includes('xml') || fileType.includes('json')) return <CodeIcon />;
  if (fileType.includes('bim') || fileType.includes('rvt') || fileType.includes('ifc')) return <ViewInArIcon />;
  if (fileType.includes('image')) return <DescriptionIcon />;
  return <InsertDriveFileIcon />;
};

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ChatInterface = () => {
  const theme = useTheme();
  const { 
    chat: { conversations, currentConversationId, agents, isTyping },
    addMessage,
    setTypingStatus,
    createNewConversation
  } = useStore();
  
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Get current conversation
  const currentConversation = conversations.find(c => c.id === currentConversationId) || conversations[0];
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentConversation?.messages]);

  // Handle message submission
  const handleSendMessage = () => {
    if (!message.trim() && files.length === 0) return;
    
    // Add user message
    const userMessage = {
      sender: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString(),
      attachments: files.map(file => ({
        id: `file-${Date.now()}-${file.name}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }))
    };
    
    addMessage(currentConversation.id, userMessage);
    setMessage('');
    setFiles([]);
    
    // Simulate agent response
    simulateAgentResponse(message, files);
  };

  // Simulate agent response based on message content
  const simulateAgentResponse = (messageText, uploadedFiles) => {
    // Add processing message
    setTypingStatus(true);
    
    setTimeout(() => {
      // Add system processing message
      addMessage(currentConversation.id, {
        sender: 'system',
        content: uploadedFiles.length > 0 
          ? `Processing ${uploadedFiles.length} file(s)...` 
          : 'Analyzing your request...',
        isProcessing: true
      });
      
      // Determine which agent should respond based on message content
      let respondingAgent;
      
      if (messageText.toLowerCase().includes('compliance') || 
          messageText.toLowerCase().includes('regulation') ||
          messageText.toLowerCase().includes('safety')) {
        respondingAgent = agents.leadAgents.find(a => a.id === 'trust-agent');
      } else if (messageText.toLowerCase().includes('schedule') || 
                messageText.toLowerCase().includes('integration') ||
                messageText.toLowerCase().includes('rfi')) {
        respondingAgent = agents.leadAgents.find(a => a.id === 'integration-agent');
      } else if (messageText.toLowerCase().includes('design') || 
                messageText.toLowerCase().includes('innovation')) {
        respondingAgent = agents.leadAgents.find(a => a.id === 'vision-agent');
      } else {
        // Default to integration agent
        respondingAgent = agents.leadAgents.find(a => a.id === 'integration-agent');
      }
      
      // Simulate file processing if files were uploaded
      if (uploadedFiles.length > 0) {
        const docIntakeAgent = agents.taskAgents.find(a => a.id === 'doc-intake-agent');
        
        setTimeout(() => {
          addMessage(currentConversation.id, {
            sender: 'agent',
            agentId: docIntakeAgent.id,
            content: `I've received ${uploadedFiles.length} file(s) and am classifying them now...`,
            timestamp: new Date().toISOString()
          });
          
          // Simulate more detailed response after another delay
          setTimeout(() => {
            const fileTypes = uploadedFiles.map(f => {
              if (f.type.includes('pdf')) return 'PDF';
              if (f.type.includes('csv')) return 'CSV';
              if (f.type.includes('xml')) return 'XML';
              if (f.name.includes('.rvt')) return 'Revit BIM';
              if (f.name.includes('.ifc')) return 'IFC BIM';
              return f.type;
            }).join(', ');
            
            addMessage(currentConversation.id, {
              sender: 'agent',
              agentId: respondingAgent.id,
              content: `I've analyzed the ${fileTypes} file(s) you uploaded. Based on the content, I can see this relates to ${respondingAgent.role}. How would you like me to proceed with this information?`,
              timestamp: new Date().toISOString()
            });
            
            setTypingStatus(false);
          }, 2000);
        }, 1500);
      } else {
        // Text-only response
        setTimeout(() => {
          addMessage(currentConversation.id, {
            sender: 'agent',
            agentId: respondingAgent.id,
            content: `I'm analyzing your question about "${messageText}". This falls under my expertise as ${respondingAgent.role}. Let me provide some information based on the project data.`,
            timestamp: new Date().toISOString()
          });
          
          setTypingStatus(false);
        }, 1500);
      }
    }, 500);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  // Remove file from the list
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Get agent color by ID
  const getAgentColor = (agentId) => {
    const leadAgent = agents.leadAgents.find(a => a.id === agentId);
    if (leadAgent) return leadAgent.color;
    
    const taskAgent = agents.taskAgents.find(a => a.id === agentId);
    if (taskAgent) {
      const parentAgent = agents.leadAgents.find(a => a.id === taskAgent.leadAgent);
      return parentAgent ? parentAgent.color : taskAgent.color;
    }
    
    return theme.palette.primary.main;
  };

  // Get agent name and avatar by ID
  const getAgentInfo = (agentId) => {
    const leadAgent = agents.leadAgents.find(a => a.id === agentId);
    if (leadAgent) {
      return {
        name: leadAgent.name,
        avatar: leadAgent.avatar,
        color: leadAgent.color
      };
    }
    
    const taskAgent = agents.taskAgents.find(a => a.id === agentId);
    if (taskAgent) {
      return {
        name: taskAgent.name,
        avatar: taskAgent.avatar,
        color: taskAgent.color
      };
    }
    
    return {
      name: 'AI Assistant',
      avatar: 'smart_toy',
      color: theme.palette.primary.main
    };
  };

  // Render message content with markdown support
  const renderMessageContent = (content) => {
    return (
      <ReactMarkdown
        components={{
          h1: (props) => <Typography variant="h5" fontWeight="bold" gutterBottom {...props} />,
          h2: (props) => <Typography variant="h6" fontWeight="bold" gutterBottom {...props} />,
          h3: (props) => <Typography variant="subtitle1" fontWeight="bold" gutterBottom {...props} />,
          p: (props) => <Typography variant="body2" paragraph {...props} />,
          a: (props) => <a style={{ color: theme.palette.primary.main }} {...props} />,
          ul: (props) => <Box component="ul" sx={{ pl: 2, mt: 1, mb: 1 }} {...props} />,
          ol: (props) => <Box component="ol" sx={{ pl: 2, mt: 1, mb: 1 }} {...props} />,
          li: (props) => <Typography component="li" variant="body2" sx={{ mb: 0.5 }} {...props} />,
          table: (props) => (
            <Box sx={{ overflowX: 'auto', my: 2 }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }} {...props} />
            </Box>
          ),
          tr: (props) => <tr style={{ borderBottom: `1px solid ${theme.palette.divider}` }} {...props} />,
          th: (props) => (
            <th style={{ 
              padding: theme.spacing(1), 
              textAlign: 'left', 
              backgroundColor: theme.palette.background.default
            }} {...props} />
          ),
          td: (props) => <td style={{ padding: theme.spacing(1), textAlign: 'left' }} {...props} />,
          code: (props) => (
            <Box component="code" sx={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
              padding: '2px 4px', 
              borderRadius: 1,
              fontFamily: 'monospace'
            }} {...props} />
          ),
          pre: (props) => (
            <Box component="pre" sx={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
              padding: theme.spacing(1.5),
              borderRadius: theme.shape.borderRadius,
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              my: 2
            }} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <MessageContainer>
      {/* Message list */}
      <MessageList>
        {currentConversation?.messages.map((msg, index) => {
          // User message
          if (msg.sender === 'user') {
            return (
              <Box key={msg.id || index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <MessageBubble isUser elevation={0}>
                  <Typography variant="body2">{msg.content}</Typography>
                  
                  {/* File attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {msg.attachments.map((file, fileIndex) => (
                        <AttachmentCard key={file.id || fileIndex}>
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5, width: 36, height: 36 }}>
                                {getFileIcon(file.type)}
                              </Avatar>
                              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                <Typography variant="body2" noWrap fontWeight="medium">
                                  {file.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatFileSize(file.size)}
                                </Typography>
                              </Box>
                              <Tooltip title="Download">
                                <IconButton size="small" href={file.url} download={file.name}>
                                  <DownloadIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </CardContent>
                        </AttachmentCard>
                      ))}
                    </Box>
                  )}
                </MessageBubble>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, mr: 1 }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
            );
          }
          
          // System message
          if (msg.sender === 'system') {
            return (
              <SystemMessage key={msg.id || index} elevation={0}>
                {msg.isProcessing && <CircularProgress size={16} sx={{ mr: 1 }} />}
                <Typography variant="body2" color="text.secondary">
                  {msg.content}
                </Typography>
              </SystemMessage>
            );
          }
          
          // Agent message
          if (msg.sender === 'agent') {
            const agentInfo = getAgentInfo(msg.agentId);
            const agentColor = getAgentColor(msg.agentId);
            
            return (
              <Box key={msg.id || index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AgentAvatar agentColor={agentColor}>
                    <Icon fontSize="small">{agentInfo.avatar}</Icon>
                  </AgentAvatar>
                  <Typography variant="body2" fontWeight="medium" sx={{ ml: 1 }}>
                    {agentInfo.name}
                  </Typography>
                </Box>
                
                <MessageBubble agentColor={agentColor} elevation={0}>
                  {renderMessageContent(msg.content)}
                  
                  {/* File attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {msg.attachments.map((file, fileIndex) => (
                        <AttachmentCard key={file.id || fileIndex}>
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: agentColor, mr: 1.5, width: 36, height: 36 }}>
                                {getFileIcon(file.type)}
                              </Avatar>
                              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                <Typography variant="body2" noWrap fontWeight="medium">
                                  {file.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatFileSize(file.size)}
                                </Typography>
                              </Box>
                              <Tooltip title="Download">
                                <IconButton size="small" href={file.url} download={file.name}>
                                  <DownloadIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </CardContent>
                        </AttachmentCard>
                      ))}
                    </Box>
                  )}
                  
                  {/* Message actions */}
                  {msg.actions && msg.actions.length > 0 && (
                    <MessageActions>
                      {msg.actions.map((action) => (
                        <ActionButton 
                          key={action.id} 
                          variant="outlined" 
                          size="small"
                          onClick={() => console.log('Action clicked:', action)}
                        >
                          {action.label}
                        </ActionButton>
                      ))}
                    </MessageActions>
                  )}
                </MessageBubble>
                
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
            );
          }
          
          return null;
        })}
        
        {/* Typing indicator */}
        {isTyping && (
          <SystemMessage elevation={0}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              AI is typing...
            </Typography>
          </SystemMessage>
        )}
        
        {/* Empty div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </MessageList>
      
      <Divider sx={{ my: 2 }} />
      
      {/* File upload area */}
      {files.length > 0 ? (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight="medium" gutterBottom>
            Selected Files ({files.length})
          </Typography>
          <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
            {files.map((file, index) => (
              <FilePreview key={index}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5, width: 32, height: 32 }}>
                  {getFileIcon(file.type)}
                </Avatar>
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => removeFile(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </FilePreview>
            ))}
          </Box>
        </Box>
      ) : (
        <FileUploadArea
          isDragActive={isDragging}
          isDragReject={isDragReject}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            multiple
            accept=".pdf,.csv,.xml,.rvt,.ifc,.dwg,.jpg,.jpeg,.png"
          />
          <UploadFileIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="body1" fontWeight="medium" gutterBottom>
            Drop files here or click to upload
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Supports BIM models (.rvt, .ifc), PDFs, CSVs, XML, and images
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 2 }}>
            <Chip label="BIM" size="small" icon={<ViewInArIcon />} />
            <Chip label="PDF" size="small" icon={<PictureAsPdfIcon />} />
            <Chip label="CSV" size="small" icon={<TableChartIcon />} />
            <Chip label="XML" size="small" icon={<CodeIcon />} />
          </Box>
        </FileUploadArea>
      )}
      
      {/* Message input */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton color="primary" onClick={() => fileInputRef.current?.click()}>
          <AttachFileIcon />
        </IconButton>
        <MessageInput
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
          multiline
          maxRows={4}
          InputProps={{
            endAdornment: (
              <IconButton 
                color="primary" 
                onClick={handleSendMessage}
                disabled={!message.trim() && files.length === 0}
              >
                <SendIcon />
              </IconButton>
            )
          }}
        />
      </Box>
    </MessageContainer>
  );
};

export default ChatInterface;
